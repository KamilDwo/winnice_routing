const connection = require('../config/db.config');

const Province = () => {};

Province.getAllProvinces = result => {
    connection.query(`SET NAMES utf8;
     SELECT id, name, coordinates FROM provinces`, (error, results) => {
        if (error) {
            result(null, error);
        }
        else {
            result(results[1], null);
        }
    });
};

module.exports = Province;

