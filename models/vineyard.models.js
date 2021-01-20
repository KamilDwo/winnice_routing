'use strict';

const connection = require('../config/db.config');

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
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Vineyard.findById = (id, result) => {
    connection.query(`SELECT ${defaultFields} FROM pw_vineyard WHERE id = ? LIMIT 1`, id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = Vineyard;

