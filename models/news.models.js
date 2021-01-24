'use strict';

const connection = require('../config/db.config');

const News = news => {
    this.id = news.id;
    this.type = news.type;
    this.message = news.message;
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
    if (body && body.language === 'pl') {
        defaultFields += ' name_pl as \'name\', message_pl as \'message\',';
    }
    else {
        defaultFields += ' name_en as \'name\', message_en as \'message\',';
    }
    defaultFields += ' image_1 as \'image1\'';

    connection.query(`SELECT ${defaultFields} FROM pw_news2`, function (err, res) {
        if (err) {
            console.log('error: ', err);
            result(err);
        } else {
            const parseItems = res.map(item => {
                item.isActive = item.isActive === 2;
                item.category1 = !!item.category1;
                item.category2 = !!item.category2;
                item.category3 = !!item.category3;
                item.category4 = !!item.category4;
                item.category5 = !!item.category5;
                item.category6 = !!item.category6;
                item.category7 = !!item.category7;
                item.category8 = !!item.category8;
                item.category9 = !!item.category9;
                item.category10 = !!item.category10;
                return item;
            });
            result(parseItems);
        }
    });
};

module.exports = News;
