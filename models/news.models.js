

require('dotenv').config();
const connection = require('../config/db.config');
const listToArray = require('../helpers/listToArray.helper');
const NewsTypes = require('../enums/news.enums');
const InstagramApi = require('instagram-web-api');

const {INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD} = process.env;
const instagramClient = new InstagramApi({
    username: INSTAGRAM_USERNAME, password: INSTAGRAM_PASSWORD,
});
const moment = require('moment');
const {OAuth2} = require('oauth');
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
            const parseItems = results.map(item => {
                item.isActive = item.isActive === 2;
                return item;
            });
            result(parseItems, null);
        }
    });
};

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

        getAccessToken().then(token => {
            axios.get(`https://graph.facebook.com/v2.9/heartitpl/posts?access_token=${token}`)
                .then(response => {
                    result(response, null);
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

// eslint-disable-next-line no-unused-vars
News.getInstagramPhotos = (result, body) => {
    ;(async () => {
        try {
            await instagramClient.login();
            const profile = await instagramClient.getPhotosByUsername({
                username: 'kamil.dwo',
            });
            if (profile.user.edge_owner_to_timeline_media.edges) {
                const photos = profile.user.edge_owner_to_timeline_media.edges.map(photo => ({
                    externalId: photo.node.id,
                    image1: photo.node.display_url,
                    type: NewsTypes.INSTAGRAM,
                    dateAdd: photo.node.taken_at_timestamp,
                    url: `https://www.instagram.com/p/${photo.node.shortcode}`,
                    isActive: true,
                    likesCount: photo.node.edge_media_preview_like.count,
                    commentsCount: photo.node.edge_media_to_comment.count,
                }));
                connection.query(`SELECT external_id as 'externalId', id FROM pw_news`, (error, results) => {
                    let lastId = results[results.length - 1].id;
                    const parseResults = results.map(resultItem => resultItem.externalId);
                    const photosToAdd = photos.filter(photo => !parseResults.includes(photo.externalId));
                    if (photosToAdd.length > 0) {
                        const newPhotosToAdd = photosToAdd.map(photo => {
                            const newPhoto = {
                                ...photo,
                                type: 2,
                                dateAdd: moment(photo.dateAdd).format('YYYY-MM-DDThh:mm:ss.ms'),
                            };
                            // eslint-disable-next-line no-return-assign
                            return [lastId += 1, ...Object.values(newPhoto)];
                        });

                        connection.query(`INSERT INTO pw_news (id, externalId, image, type, dateAdd, url, isActive, likesCount, commentsCount) VALUES ?`, [newPhotosToAdd], (error2, results2) => {
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

News.findAll = (result, body) => {
    let defaultFields = 'id,' +
        ' date_add as \'dateAdd\',' +
        ' category_1 as \'category1\',' +
        ' category_2 as \'category2\',' +
        ' category_3 as \'category3\',' +
        ' category_4 as \'category4\',' +
        ' category_5 as \'category5\',' +
        ' category_6 as \'category6\',' +
        ' category_7 as \'category7\',' +
        ' category_8 as \'category8\',' +
        ' category_9 as \'category9\',' +
        ' category_10 as \'category10\',' +
        ' is_active as \'isActive\',' +
        ' id_province as  \'idProvince\',' +
        ' news_provinces as \'newsProvinces\',';

    const defaultFields2 = 'id,' +
        ' date_add as \'dateAdd\',' +
        ' likes_count as \'likesCount\',' +
        ' comments_count as \'commentsCount\',' +
        ' is_active as \'isActive\',' +
        ' url,' +
        ' message,' +
        ' image_1 as \'image1\',' +
        ' type';

    if (body && body.language === 'pl') {
        defaultFields += ' name_pl as \'name\', message_pl as \'message\',';
    }
    else {
        defaultFields += ' name_en as \'name\', message_en as \'message\',';
    }
    defaultFields += ' image_1 as \'image1\'';

    const query = `SELECT ${defaultFields} FROM pw_news2; SELECT ${defaultFields2} FROM pw_news`;
    connection.query(query, (error, results) => {
        if (error) {
            result(null, error);
        }
        else {
            const parseItems = results[0].map(item => {
                const itemCategories = [];
                item.isActive = item.isActive === 2;
                item.type = NewsTypes.PAGE;
                item.categories = itemCategories;

                if (item.category1) {
                    itemCategories.push(parseInt(item.category1));
                }
                if (item.category2) {
                    itemCategories.push(parseInt(item.category2));
                }
                if (item.category3) {
                    itemCategories.push(parseInt(item.category3));
                }
                if (item.category4) {
                    itemCategories.push(parseInt(item.category4));
                }
                if (item.category5) {
                    itemCategories.push(parseInt(item.category5));
                }
                if (item.category6) {
                    itemCategories.push(parseInt(item.category6));
                }
                if (item.category7) {
                    itemCategories.push(parseInt(item.category7));
                }
                if (item.category8) {
                    itemCategories.push(parseInt(item.category8));
                }
                if (item.category9) {
                    itemCategories.push(parseInt(item.category9));
                }
                if (item.category10) {
                    itemCategories.push(parseInt(item.category10));
                }

                const element = item.newsProvinces;
                if (element) {
                    const newsProvincesParse = element.replace('[', '');
                    const newsProvincesParse2 = newsProvincesParse.replace(']', '');
                    item.provinces = listToArray(newsProvincesParse2, ',');
                    delete item.newsProvinces;
                }

                delete item.category1;
                delete item.category2;
                delete item.category3;
                delete item.category4;
                delete item.category5;
                delete item.category6;
                delete item.category7;
                delete item.category8;
                delete item.category9;
                delete item.category10;
                delete item.idProvince;
                return item;
            });
            const parseItems2 = results[1].map(item => {
                switch (item.type) {
                    case 1:
                        item.type = NewsTypes.FACEBOOK;
                        break;
                    case 2:
                        item.type = NewsTypes.INSTAGRAM;
                        break;
                    case 3:
                        item.type = NewsTypes.TWITTER;
                        break;
                    case 4:
                        item.type = NewsTypes.YOUTUBE;
                        break;
                    case 5:
                        item.type = NewsTypes.YOUTUBE;
                        break;
                }
                return item;
            });
            result([...parseItems, ...parseItems2], null);
        }
    });
};

module.exports = News;
