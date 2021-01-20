'use strict';

const connection = require('../config/db.config');
const speakingurl = require('speakingurl');

const Vineyard = vineyard => {
    this.id = vineyard.id;
    this.name = vineyard.name;
};

const defaultFields = 'id,' +
    ' name,' +
    ' date_add as \'dateAdd\',' +
    ' location,' +
    ' province_id as \'provinceId\',' +
    ' image_1 as \'image1\',' +
    ' tastings, ' +
    ' sightseeing, ' +
    ' meals, ' +
    ' events, ' +
    ' additional, ' +
    ' accommodation, ' +
    ' sale, ' +
    ' marker_id as \'markerId\'';

Vineyard.findAll = result => {
    connection.query(`SELECT ${defaultFields} FROM pw_vineyard`, function (err, res) {
        if (err) {
            console.log('error: ', err);
            result(err);
        } else {
            const parseItems = res.map(item => {
                item.features = [];
                const location = item['location'].split(',');
                item.isActive = item.isActive === 2;
                const objUrl = `${item['id']}-${speakingurl(item['name'], [])}`;
                item.location = [parseFloat(location[0]), parseFloat(location[1].replace(/\s+/g, ''))];
                item.url = objUrl;
                return item;
            });
            result(parseItems);
        }
    });
};

Vineyard.findById = (id, result) => {
    connection.query(`SELECT ${defaultFields} FROM pw_vineyard WHERE id = ? LIMIT 1`, id, function (err, res) {
        if (err) {
            console.log('error: ', err);
            result(err);
        } else {
            const item = res[0];
            item.features = [];
            const location = item['location'].split(',');
            item.isActive = item.isActive === 2;
            const objUrl = `${item['id']}-${speakingurl(item['name'], [])}`;
            item.location = [parseFloat(location[0]), parseFloat(location[1].replace(/\s+/g, ''))];
            item.url = objUrl;
            result(item);
        }
    });
};

module.exports = Vineyard;

