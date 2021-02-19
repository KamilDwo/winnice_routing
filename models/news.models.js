'use strict'

require('dotenv').config()
const connection = require('../config/db.config')
const listToArray = require('../helpers/listToArray.helper')
const NewsTypes = require('../enums/news.enums')
const InstagramApi = require('instagram-web-api')
const { INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD } = process.env
const instagramClient = new InstagramApi({ username: INSTAGRAM_USERNAME, password: INSTAGRAM_PASSWORD })

const News = news => {
    this.id = news.id
    this.type = news.type
    this.message = news.message
}

News.findAllCategories = (result, body) => {
    let defaultFields = 'id,'
    if (body && body.language === 'pl') {
        defaultFields += ' name_pl as \'name\''
    }
    else {
        defaultFields += ' name_en as \'name\''
    }

    connection.query(`SELECT ${defaultFields} FROM pw_news_categories`, function (err, res) {
        if (err) {
            result(err, null)
        } else {
            const parseItems = res.map(item => {
                item.isActive = item.isActive === 2
                return item
            })
            result(parseItems)
        }
    })
}

News.getInstagramPhotos = (result, body) => {
    /*;(async () => {
        try {
            await instagramClient.login()
            const profile = await instagramClient.getPhotosByUsername({ username: 'kamil.dwo' })
            result(profile)
        } catch (error) {
            result(error.error.message)
        }
    })()*/
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

    if (body && body.language === 'pl') {
        defaultFields += ' name_pl as \'name\', message_pl as \'message\','
    }
    else {
        defaultFields += ' name_en as \'name\', message_en as \'message\','
    }
    defaultFields += ' image_1 as \'image1\''

    connection.query(`SELECT ${defaultFields} FROM pw_news23`, function (err, res) {
        if (err) {
            result(err, null)
        } else {
            const parseItems = res.map(item => {
                const itemCategories = []
                item.isActive = item.isActive === 2
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
                let newsProvincesParse = element.replace('[', '')
                let newsProvincesParse2 = newsProvincesParse.replace(']', '')
                item.provinces = listToArray(newsProvincesParse2, ',')

                delete item.newsProvinces
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
                item.categories = itemCategories
                return item
            })
            result(parseItems)
        }
    })
}

module.exports = News
