require('dotenv').config();
const connection = require('../config/db.config');
const NewsTypes = require('../enums/news.enums');
const InstagramApi = require('instagram-web-api');
const fs = require('fs');
const request = require('request');

const {INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD} = process.env;
const instagramClient = new InstagramApi({
    username: INSTAGRAM_USERNAME, password: INSTAGRAM_PASSWORD,
});
const dayjs = require('dayjs');
const axios = require('axios');

const News = news => {
    this.id = news.id;
    this.type = news.type;
    this.message = news.message;
};

News.findAllCategories = (result, body) => {
    let defaultFields = 'id,';
    if (body && body.language === 'pl') {
        defaultFields += ' name_pl as \'name\'';
    }
    else {
        defaultFields += ' name_en as \'name\'';
    }

    connection.query(`SELECT ${defaultFields} FROM pw_news_categories`, (error, results) => {
        if (error) {
            result(null, error);
        }
        else {
            const parseItems = results.forEach(item => ({
                ...item,
                isActive: item.isActive === 2,
            }));
            result(parseItems, null);
        }
    });
};

// eslint-disable-next-line no-unused-vars
News.getFacebookNews = (result, body) => {
    try {
        const getAccessToken = () => new Promise((resolve, reject) => axios.get('https://graph.facebook.com/oauth/access_token?client_id=918657384983659&client_secret=8b33bca18a2780fe7b4ae42220a89929&grant_type=client_credentials')
            .then(response => {
                resolve(response.data.access_token);
            })
            .catch(error => {
                reject(error);
            })
        );

        // eslint-disable-next-line no-unused-vars
        getAccessToken().then(token => {
            axios.get(`https://graph.facebook.com/v10.0/polskiewinniceplofficial/posts?fields=picture,scheduled_publish_time,shares,message,permalink_url,created_time,comments.summary(true).limit(0),likes.summary(true).limit(0)&access_token=EAANDg5caLGsBAOqZBFCWs8KTxY0bsGVDT47L2ZCKZAg15qbplsDiT9Az57JdqcjRGTeqEygGuCBuPZApiPGkHV0xDft3t9RGXNbY7DZCOzTo6fDmvlX3P0cI07V5ZCKQy1fpEr9Fkgk8G6vkNdjNeZAVtZCAXYonGd3WCpWlr4BkVHbdFFFkZCSomZBUS9cHxbB0IUeeajsZCITOtg7LwevZAGMm`)
                .then(response => {
                    const photos = response.data.data.map(post => ({
                        externalId: post.id,
                        image: post.picture,
                        type: NewsTypes.FACEBOOK,
                        dateAdd: post.created_time,
                        url: post.permalink_url,
                        isActive: 1,
                        message: post.message || '',
                        likesCount: post.likes.summary.total_count,
                        commentsCount: post.comments.summary.total_count,
                    }));
                    connection.query(`SELECT externalId, id FROM news`, (error, results) => {
                        let lastId;
                        if (results && results.length > 0) {
                            lastId = results[results.length - 1].id;
                        }
                        else {
                            lastId = 0;
                        }
                        let photosToAdd;
                        if (results && results.length > 0) {
                            const parseResults = results.map(resultItem => resultItem.externalId);
                            photosToAdd = photos.filter(photo => !parseResults.includes(photo.externalId));
                        }
                        else {
                            photosToAdd = photos;
                        }
                        if (photosToAdd.length > 0) {
                            const newPhotosToAdd = photosToAdd.map(photo => {
                                const newPhoto = {
                                    ...photo,
                                    type: 1,
                                    dateAdd: dayjs(photo.dateAdd).format('YYYY-MM-DDThh:mm:ss.ms'),
                                };
                                // eslint-disable-next-line no-return-assign
                                return [lastId += 1, ...Object.values(newPhoto)];
                            });

                            connection.query(`INSERT INTO news (id, externalId, image, type, dateAdd, url, isActive, message, likesCount, commentsCount) VALUES ?`, [newPhotosToAdd], (error2, results2) => {
                                if (error2) {
                                    result(null, {
                                        error: {
                                            message: error2.sqlMessage,
                                        },
                                    });
                                }
                                else {
                                    result(results2, null);
                                }
                            });
                        }
                        else {
                            result(null, {
                                error: {
                                    message: 'No data to add',
                                },
                            });
                        }
                    });
                })
                .catch(error => {
                    console.log(error);
                    result(null, {
                        error: {
                            message: error.response.data.error.message,
                        },
                    });
                });
        }).catch(error => {
            console.log('blad2', error.response);
            result(null, {
                error: {
                    message: error,
                },
            });
        });
    }
    catch (error) {
        console.log('blad1', error.response);
        result(null, {
            error: {
                message: error,
            },
        });
    }
};

const downloadImage = function(uri, filename, callback){
    // eslint-disable-next-line no-unused-vars
    request.head(uri, (err, res, body)=> {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

// eslint-disable-next-line no-unused-vars
News.getInstagramPhotos = (result, body) => {
    ;(async () => {
        try {
            await instagramClient.login();
            const profile = await instagramClient.getPhotosByUsername({
                username: 'kamil.dwo',
            });
            if (profile.user.edge_owner_to_timeline_media.edges) {
                profile.user.edge_owner_to_timeline_media.edges.forEach(image => {
                    downloadImage(image.node.display_url, 'google.png', () => {
                        console.log('done');
                    });
                });
                const photos = profile.user.edge_owner_to_timeline_media.edges.map(photo => ({
                    externalId: photo.node.id,
                    image: photo.node.display_url,
                    type: NewsTypes.INSTAGRAM,
                    dateAdd: photo.node.taken_at_timestamp,
                    url: `https://www.instagram.com/p/${photo.node.shortcode}`,
                    isActive: true,
                    likesCount: photo.node.edge_media_preview_like.count,
                    commentsCount: photo.node.edge_media_to_comment.count,
                }));
                connection.query(`SELECT externalId, id FROM news`, (error, results) => {
                    let lastId;
                    if (results && results.length > 0) {
                        lastId = results[results.length - 1].id;
                    }
                    else {
                        lastId = 0;
                    }
                    let photosToAdd;
                    if (results && results.length > 0) {
                        const parseResults = results.map(resultItem => resultItem.externalId);
                        photosToAdd = photos.filter(photo => !parseResults.includes(photo.externalId));
                    }
                    else {
                        photosToAdd = photos;
                    }
                    if (photosToAdd.length > 0) {
                        const newPhotosToAdd = photosToAdd.map(photo => {
                            const newPhoto = {
                                ...photo,
                                type: 2,
                                dateAdd: dayjs(photo.dateAdd).format('YYYY-MM-DDThh:mm:ss.ms'),
                            };
                            // eslint-disable-next-line no-return-assign
                            return [lastId += 1, ...Object.values(newPhoto)];
                        });

                        connection.query(`INSERT INTO news (id, externalId, image, type, dateAdd, url, isActive, likesCount, commentsCount) VALUES ?`, [newPhotosToAdd], (error2, results2) => {
                            if (error2) {
                                result(null, {
                                    error: {
                                        message: error2.sqlMessage,
                                    },
                                });
                            }
                            else {
                                result(results2, null);
                            }
                        });
                    }
                    else {
                        result(null, {
                            error: {
                                message: 'No data to add',
                            },
                        });
                    }
                });
            }
        }
        catch (error) {
            result(null, error);
        }
    })();
};

// eslint-disable-next-line no-unused-vars
News.findAll = (result, body) => {
    const defaultFields = `
        id,
        dateAdd,
        likesCount,
        commentsCount,
        isActive,
        url,
        message,
        image,
        type
    `;

    const getType = type => {
        switch (type) {
            case 1:
                return NewsTypes.FACEBOOK;
            case 2:
                return NewsTypes.INSTAGRAM;
            case 3:
                return NewsTypes.TWITTER;
            case 4:
                return NewsTypes.YOUTUBE;
            case 5:
                return NewsTypes.YOUTUBE;
            default:
                return null;
        }
    };

    const query = `SELECT ${defaultFields} FROM news`;
    connection.query(query, (error, results) => {
        if (error) {
            result(null, error);
        }
        else {
            const parseItems = results.map(item => ({
                ...item,
                type: getType(item.type),
            }));
            result(parseItems, null);
        }
    });
};

module.exports = News;
