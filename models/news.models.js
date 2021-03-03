'use strict'

require('dotenv').config()
const connection = require('../config/db.config')
const listToArray = require('../helpers/listToArray.helper')
const NewsTypes = require('../enums/news.enums')
const InstagramApi = require('instagram-web-api')
const {INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD} = process.env
const instagramClient = new InstagramApi({username: INSTAGRAM_USERNAME, password: INSTAGRAM_PASSWORD})

const News = news => {
    this.id = news.id
    this.type = news.type
    this.message = news.message
}

News.findAllCategories = (result, body) => {
    let defaultFields = 'id,'
    if (body && body.language === 'pl') {
        defaultFields += ' name_pl as \'name\''
    } else {
        defaultFields += ' name_en as \'name\''
    }

    connection.query(`SELECT ${defaultFields} FROM pw_news_categories`, function (error, results) {
        if (error) {
            result(null, error)
        } else {
            const parseItems = results.map(item => {
                item.isActive = item.isActive === 2
                return item
            })
            result(parseItems, null)
        }
    })
}

News.getInstagramPhotos = (result, body) => {
    ;(async () => {
        try {
            /* await instagramClient.login()
             const profile = await instagramClient.getPhotosByUsername({ username: 'kamil.dwo' })*/

            const profile = {
                "user": {
                    "edge_owner_to_timeline_media": {
                        "count": 2,
                        "page_info": {
                            "has_next_page": false,
                            "end_cursor": null
                        },
                        "edges": [
                            {
                                "node": {
                                    "__typename": "GraphImage",
                                    "id": "1897914767394491662",
                                    "dimensions": {
                                        "height": 480,
                                        "width": 480
                                    },
                                    "display_url": "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-15/e35/43536308_708147876227536_114559076454183772_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=104&_nc_ohc=5uJWKV0m8aQAX_BUOcB&tp=1&oh=493c4096947406168bbeeb371a0aea2c&oe=605FC0F1",
                                    "display_resources": [
                                        {
                                            "src": "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-15/e35/43536308_708147876227536_114559076454183772_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=104&_nc_ohc=5uJWKV0m8aQAX_BUOcB&tp=1&oh=493c4096947406168bbeeb371a0aea2c&oe=605FC0F1",
                                            "config_width": 640,
                                            "config_height": 640
                                        },
                                        {
                                            "src": "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-15/e35/43536308_708147876227536_114559076454183772_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=104&_nc_ohc=5uJWKV0m8aQAX_BUOcB&tp=1&oh=493c4096947406168bbeeb371a0aea2c&oe=605FC0F1",
                                            "config_width": 750,
                                            "config_height": 750
                                        },
                                        {
                                            "src": "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-15/e35/43536308_708147876227536_114559076454183772_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=104&_nc_ohc=5uJWKV0m8aQAX_BUOcB&tp=1&oh=493c4096947406168bbeeb371a0aea2c&oe=605FC0F1",
                                            "config_width": 1080,
                                            "config_height": 1080
                                        }
                                    ],
                                    "is_video": false,
                                    "should_log_client_event": false,
                                    "tracking_token": "eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjpmYWxzZSwidXVpZCI6IjQ5ZWViNDJjZTMwNjRhM2Y5OGNlOTA4YmExOGY1NzQ5MTg5NzkxNDc2NzM5NDQ5MTY2MiIsInNlcnZlcl90b2tlbiI6IjE2MTQxNTAwNTI1NDl8MTg5NzkxNDc2NzM5NDQ5MTY2MnwxNDM5MTIzMzZ8NDQ3Y2JiZmVmZTM3NjYwYWE2NmZkZmFjZjJlN2MxNDk5Mjc3ODg5OTk2MTllNmZlNmNmOGQ0ZmM5MTI1NTIyYiJ9LCJzaWduYXR1cmUiOiIifQ==",
                                    "edge_media_to_tagged_user": {
                                        "edges": []
                                    },
                                    "edge_media_to_caption": {
                                        "edges": []
                                    },
                                    "shortcode": "BpWv2zkhE0O",
                                    "edge_media_to_comment": {
                                        "count": 3,
                                        "page_info": {
                                            "has_next_page": false,
                                            "end_cursor": null
                                        },
                                        "edges": [
                                            {
                                                "node": {
                                                    "id": "17989562827072745",
                                                    "text": "https://heartit.pl",
                                                    "created_at": 1541514977,
                                                    "owner": {
                                                        "id": "143912336",
                                                        "profile_pic_url": "https://scontent-amt2-1.cdninstagram.com/v/t51.2885-19/s150x150/51368281_2073302502706855_5884556991719800832_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_ohc=PxTqkRnwrRwAX96D5kH&tp=1&oh=747b9cc4b41839399e561a0e3277bedd&oe=6060A848",
                                                        "username": "kamil.dwo"
                                                    }
                                                }
                                            },
                                            {
                                                "node": {
                                                    "id": "17933467114217192",
                                                    "text": "test",
                                                    "created_at": 1541586437,
                                                    "owner": {
                                                        "id": "143912336",
                                                        "profile_pic_url": "https://scontent-amt2-1.cdninstagram.com/v/t51.2885-19/s150x150/51368281_2073302502706855_5884556991719800832_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_ohc=PxTqkRnwrRwAX96D5kH&tp=1&oh=747b9cc4b41839399e561a0e3277bedd&oe=6060A848",
                                                        "username": "kamil.dwo"
                                                    }
                                                }
                                            },
                                            {
                                                "node": {
                                                    "id": "17876554960285300",
                                                    "text": "test",
                                                    "created_at": 1541591481,
                                                    "owner": {
                                                        "id": "8234552108",
                                                        "profile_pic_url": "https://scontent-amt2-1.cdninstagram.com/v/t51.2885-19/s150x150/37746444_1088988227928140_6221269873536794624_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_ohc=4sOxUAK47OQAX9aRMPR&tp=1&oh=61b0e42d71ebbd42f147fcb94ea661ad&oe=605E3846",
                                                        "username": "polskiewinnice"
                                                    }
                                                }
                                            }
                                        ]
                                    },
                                    "comments_disabled": false,
                                    "taken_at_timestamp": 1540469092,
                                    "edge_media_preview_like": {
                                        "count": 2
                                    },
                                    "gating_info": null,
                                    "media_preview": "ACoqwsU4ClAqeNAck9F6+/oPxpDSuRA0Zq4uSvYFvujHGB1z9feqzgMu4cdiP5EfWkmU49n/AF/WvoQmm1NKQeQAPoTn/CoKa1E1Z2LVuqnLv9xACQOCxPAXPbPc9gDVgzGRCMKoBGAoAA6/ifxJqvb/ALxHhH3m2so9Sufl+pBOPUjFMR9hwfoQeP8A9RoYIsCUgYwOM4PcZ61Fj5G/4D/M0vyH+LA9xz+nFShgYZAvQFOT1OSf84pehW276P8AFWHXe9oUZi3O3IJBH3eDgDIyOmTxWbWhdBVhRcAHrwwIPUEgAnOT3IGMYrPqiAFXFvJe5De7KrH8yCap09aALv2uT/Z/74T/AOJqOS4kddpIwcZwqjp06AVGKDQAks7yABsYHTCqP5Ace341BT2plAj/2Q==",
                                    "owner": {
                                        "id": "143912336"
                                    },
                                    "thumbnail_src": "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-15/e35/43536308_708147876227536_114559076454183772_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=104&_nc_ohc=5uJWKV0m8aQAX_BUOcB&tp=1&oh=493c4096947406168bbeeb371a0aea2c&oe=605FC0F1",
                                    "thumbnail_resources": [
                                        {
                                            "src": "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-15/e35/s150x150/43536308_708147876227536_114559076454183772_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=104&_nc_ohc=5uJWKV0m8aQAX_BUOcB&tp=1&oh=4e845ec19e0d465ee31be6b431ae3706&oe=605DD1E3",
                                            "config_width": 150,
                                            "config_height": 150
                                        },
                                        {
                                            "src": "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-15/e35/s240x240/43536308_708147876227536_114559076454183772_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=104&_nc_ohc=5uJWKV0m8aQAX_BUOcB&tp=1&oh=c733284d25feaf1e8744e8be591b9250&oe=605DF8D8",
                                            "config_width": 240,
                                            "config_height": 240
                                        },
                                        {
                                            "src": "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-15/e35/s320x320/43536308_708147876227536_114559076454183772_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=104&_nc_ohc=5uJWKV0m8aQAX_BUOcB&tp=1&oh=8f0ee07c5f955883a45f87617cd7fc77&oe=606176F0",
                                            "config_width": 320,
                                            "config_height": 320
                                        },
                                        {
                                            "src": "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-15/e35/43536308_708147876227536_114559076454183772_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=104&_nc_ohc=5uJWKV0m8aQAX_BUOcB&tp=1&oh=493c4096947406168bbeeb371a0aea2c&oe=605FC0F1",
                                            "config_width": 480,
                                            "config_height": 480
                                        },
                                        {
                                            "src": "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-15/e35/43536308_708147876227536_114559076454183772_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=104&_nc_ohc=5uJWKV0m8aQAX_BUOcB&tp=1&oh=493c4096947406168bbeeb371a0aea2c&oe=605FC0F1",
                                            "config_width": 640,
                                            "config_height": 640
                                        }
                                    ]
                                }
                            },
                            {
                                "node": {
                                    "__typename": "GraphImage",
                                    "id": "1824165855400179799",
                                    "dimensions": {
                                        "height": 1080,
                                        "width": 1080
                                    },
                                    "display_url": "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-15/e35/36725629_208479663331384_4809033327522611200_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=104&_nc_ohc=Rbe61Fwi0nAAX_NXqUL&tp=1&oh=970c99e2c2962a3882e5bb9461c6ea06&oe=6060DC9A",
                                    "display_resources": [
                                        {
                                            "src": "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/36725629_208479663331384_4809033327522611200_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=104&_nc_ohc=Rbe61Fwi0nAAX_NXqUL&tp=1&oh=b692a08d6c9c22bc962f31f9d8e82ef0&oe=605F4D7D",
                                            "config_width": 640,
                                            "config_height": 640
                                        },
                                        {
                                            "src": "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s750x750/36725629_208479663331384_4809033327522611200_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=104&_nc_ohc=Rbe61Fwi0nAAX_NXqUL&tp=1&oh=3de82dce81544a5521a91f63e520539e&oe=605F55FD",
                                            "config_width": 750,
                                            "config_height": 750
                                        },
                                        {
                                            "src": "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-15/e35/36725629_208479663331384_4809033327522611200_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=104&_nc_ohc=Rbe61Fwi0nAAX_NXqUL&tp=1&oh=970c99e2c2962a3882e5bb9461c6ea06&oe=6060DC9A",
                                            "config_width": 1080,
                                            "config_height": 1080
                                        }
                                    ],
                                    "is_video": false,
                                    "should_log_client_event": false,
                                    "tracking_token": "eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjpmYWxzZSwidXVpZCI6IjQ5ZWViNDJjZTMwNjRhM2Y5OGNlOTA4YmExOGY1NzQ5MTgyNDE2NTg1NTQwMDE3OTc5OSIsInNlcnZlcl90b2tlbiI6IjE2MTQxNTAwNTI1NDl8MTgyNDE2NTg1NTQwMDE3OTc5OXwxNDM5MTIzMzZ8Y2ViZWQ0ZTBiZjI1NGFkMDFmZTcwYzI5ZmQzMzVjMmY4NTE3NmI4NTczMjI2ZWRjNDgwZjMwNzAxZDkwNDhjZCJ9LCJzaWduYXR1cmUiOiIifQ==",
                                    "edge_media_to_tagged_user": {
                                        "edges": []
                                    },
                                    "edge_media_to_caption": {
                                        "edges": []
                                    },
                                    "shortcode": "BlQvS4-hjhX",
                                    "edge_media_to_comment": {
                                        "count": 0,
                                        "page_info": {
                                            "has_next_page": false,
                                            "end_cursor": null
                                        },
                                        "edges": []
                                    },
                                    "comments_disabled": false,
                                    "taken_at_timestamp": 1531677537,
                                    "edge_media_preview_like": {
                                        "count": 2
                                    },
                                    "gating_info": null,
                                    "media_preview": "ACoqMZ6/ypqjr9aPOOOlKGzzUFiEGoiv4VPmmsuRQIqyEY4qpVmRcVVxTAvqhqTym7Zq3G3FWOTU3HYz1jb3qbym9KtYx/n/AApcjB60AYlxzkDiqORWhdMB1AGe1ZmaoR00IAq2BuqnBVyDpUjHbcdfyqvcMAMVb7VSl5HNUIxbjArOzV256mqFAj//2Q==",
                                    "owner": {
                                        "id": "143912336"
                                    },
                                    "thumbnail_src": "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/36725629_208479663331384_4809033327522611200_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=104&_nc_ohc=Rbe61Fwi0nAAX_NXqUL&tp=1&oh=b692a08d6c9c22bc962f31f9d8e82ef0&oe=605F4D7D",
                                    "thumbnail_resources": [
                                        {
                                            "src": "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-15/e35/s150x150/36725629_208479663331384_4809033327522611200_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=104&_nc_ohc=Rbe61Fwi0nAAX_NXqUL&tp=1&oh=1b6c2852e82877f6cde75fa9b2e9020e&oe=605E44DC",
                                            "config_width": 150,
                                            "config_height": 150
                                        },
                                        {
                                            "src": "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-15/e35/s240x240/36725629_208479663331384_4809033327522611200_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=104&_nc_ohc=Rbe61Fwi0nAAX_NXqUL&tp=1&oh=069dafe73a6cef473b23d4c5fad8558f&oe=60617092",
                                            "config_width": 240,
                                            "config_height": 240
                                        },
                                        {
                                            "src": "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-15/e35/s320x320/36725629_208479663331384_4809033327522611200_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=104&_nc_ohc=Rbe61Fwi0nAAX_NXqUL&tp=1&oh=d81501ce85138dae70f26caa01da8fb3&oe=605FDBAC",
                                            "config_width": 320,
                                            "config_height": 320
                                        },
                                        {
                                            "src": "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-15/e35/s480x480/36725629_208479663331384_4809033327522611200_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=104&_nc_ohc=Rbe61Fwi0nAAX_NXqUL&tp=1&oh=b5a24f2567cdb0ef9d8f82e682e20afa&oe=60610BF2",
                                            "config_width": 480,
                                            "config_height": 480
                                        },
                                        {
                                            "src": "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/36725629_208479663331384_4809033327522611200_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=104&_nc_ohc=Rbe61Fwi0nAAX_NXqUL&tp=1&oh=b692a08d6c9c22bc962f31f9d8e82ef0&oe=605F4D7D",
                                            "config_width": 640,
                                            "config_height": 640
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            }


            if (profile.user.edge_owner_to_timeline_media.edges) {
                const photos = profile.user.edge_owner_to_timeline_media.edges.map(photo => {
                    return {
                        externalId: photo.node.id,
                        image1: photo.node.display_url,
                        type: NewsTypes.INSTAGRAM,
                        dateAdd: photo.node.taken_at_timestamp,
                        url: `https://www.instagram.com/p/${photo.node.shortcode}`,
                        isActive: true,
                        likesCount: photo.node.edge_media_preview_like.count,
                        commentsCount: photo.node.edge_media_to_comment.count,
                    };
                })
                console.log(photos);
            }
            result(profile, null)
        } catch (error) {
            result(null, error)
        }
    })()
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
        ' news_provinces as \'newsProvinces\','

    let defaultFields2 = 'id,' +
        ' date_add as \'dateAdd\',' +
        ' likes_count as \'likesCount\',' +
        ' comments_count as \'commentsCount\',' +
        ' is_active as \'isActive\',' +
        ' url,' +
        ' message,' +
        ' image_1 as \'image1\',' +
        ' type'

    if (body && body.language === 'pl') {
        defaultFields += ' name_pl as \'name\', message_pl as \'message\','
    } else {
        defaultFields += ' name_en as \'name\', message_en as \'message\','
    }
    defaultFields += ' image_1 as \'image1\''

    const query = `SELECT ${defaultFields} FROM pw_news2; SELECT ${defaultFields2} FROM pw_news`;
    connection.query(query, function (error, results) {
        if (error) {
            result(null, error)
        } else {
            const parseItems = results[0].map(item => {
                const itemCategories = []
                item.isActive = item.isActive === 2
                item.type = NewsTypes.PAGE
                item.categories = itemCategories

                if (item.category1) {
                    itemCategories.push(parseInt(item.category1))
                }
                if (item.category2) {
                    itemCategories.push(parseInt(item.category2))
                }
                if (item.category3) {
                    itemCategories.push(parseInt(item.category3))
                }
                if (item.category4) {
                    itemCategories.push(parseInt(item.category4))
                }
                if (item.category5) {
                    itemCategories.push(parseInt(item.category5))
                }
                if (item.category6) {
                    itemCategories.push(parseInt(item.category6))
                }
                if (item.category7) {
                    itemCategories.push(parseInt(item.category7))
                }
                if (item.category8) {
                    itemCategories.push(parseInt(item.category8))
                }
                if (item.category9) {
                    itemCategories.push(parseInt(item.category9))
                }
                if (item.category10) {
                    itemCategories.push(parseInt(item.category10))
                }

                const element = item.newsProvinces
                if (element) {
                    let newsProvincesParse = element.replace('[', '')
                    let newsProvincesParse2 = newsProvincesParse.replace(']', '')
                    item.provinces = listToArray(newsProvincesParse2, ',')
                    delete item.newsProvinces
                }

                delete item.category1
                delete item.category2
                delete item.category3
                delete item.category4
                delete item.category5
                delete item.category6
                delete item.category7
                delete item.category8
                delete item.category9
                delete item.category10
                delete item.idProvince
                return item
            })
            const parseItems2 = results[1].map(item => {
                switch (item.type) {
                    case 1:
                        item.type = NewsTypes.INSTAGRAM
                        break
                    case 2:
                        item.type = NewsTypes.INSTAGRAM
                        break
                    case 3:
                        item.type = NewsTypes.TWITTER
                        break
                    case 4:
                        item.type = NewsTypes.YOUTUBE
                        break
                    case 5:
                        item.type = NewsTypes.YOUTUBE
                        break
                }
                return item;
            })
            result([...parseItems, ...parseItems2], null)
        }
    })
}

module.exports = News
