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
        ' (SELECT COUNT(pw_vineyard_paths.id) as \'paths\' FROM pw_vineyard_paths WHERE pw_vineyard_paths.vineyard_id = pw_vineyard.id) as \'paths\', ' +
        ' (SELECT COUNT(pw_vineyard_organizations.id) as \'organizations\' FROM pw_vineyard_organizations WHERE pw_vineyard_organizations.vineyard_id = pw_vineyard.id) as \'paths\'' +
        '';

    connection.query(`SELECT ${defaultFields} FROM pw_vineyard`, function (error, results) {
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
