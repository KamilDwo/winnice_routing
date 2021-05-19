const connection = require('../config/db.config');

const Province = () => {};

Province.getProvinceById = (id, result) => {
    connection.query(`SET NAMES utf8;
     SELECT id, name, coordinates FROM provinces WHERE id = ?`, id, (error, results) => {
        if (error) {
            result(null, error);
        }
        else {
            result(results[1], null);
        }
    });
};

module.exports = Province;

