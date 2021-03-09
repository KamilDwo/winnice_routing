'use strict'

require('dotenv').config()
const connection = require('../config/db.config')

const BackOffice = news => {
    this.id = news.id
    this.type = news.type
    this.message = news.message
}

BackOffice.loginAdmin = (result, body) => {
    result({
        token: Math.random()
    }, null)
}

BackOffice.getAllVineyards = (result, body) => {
    const defaultFields = 'pw_vineyard.id,' +
        ' pw_vineyard.name,' +
        ' pw_vineyard.date_add as \'dateAdd\',' +
        ' pw_vineyard.province_id as \'provinceId\',' +
        ' pw_vineyard.is_active as \'isActive\', ' +
        ' COUNT(pw_vineyard_paths.id) as \'paths\' ' +
        ' COUNT(pw_vineyard_organizations.id) as \'organizations\' ' +
        '';

    connection.query(`SELECT ${defaultFields} FROM pw_vineyard
     LEFT JOIN pw_vineyard_paths ON pw_vineyard_paths.vineyard_id=pw_vineyard.id
     LEFT JOIN pw_vineyard_organizations ON pw_vineyard_organizations.vineyard_id=pw_vineyard.id
      GROUP BY pw_vineyard.id`, function (error, results) {
        if (error) {
            result(error, null)
        } else {
            const parseItems = results.map(item => {
                item.isActive = item.isActive === 2
                return item
            });
            result(parseItems, null)
        }
    });
}

module.exports = BackOffice
