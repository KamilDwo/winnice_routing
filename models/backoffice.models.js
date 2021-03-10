'use strict'

require('dotenv').config()
const connection = require('../config/db.config')
const listToArray = require('../helpers/listToArray.helper')
const featuresIndex = require('../helpers/featuresIndex.helper')

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
        ' (SELECT COUNT(pw_vineyard_organizations.id) as \'organizations\' FROM pw_vineyard_organizations WHERE pw_vineyard_organizations.vineyard_id = pw_vineyard.id) as \'organizations\'' +
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
    })
}

BackOffice.getVineyardById = (id, result) => {
    const defaultFields = 'pw_vineyard.id,' +
        ' pw_vineyard.name,' +
        ' pw_vineyard.date_add as \'dateAdd\',' +
        ' pw_vineyard.location,' +
        ' pw_vineyard.province_id as \'provinceId\',' +
        ' pw_vineyard.image_1 as \'image1\',' +
        ' pw_vineyard.tastings, ' +
        ' pw_vineyard.year_open as \'yearOpen\', ' +
        ' pw_vineyard.owners, ' +
        ' pw_vineyard.elevation, ' +
        ' pw_vineyard.sightseeing, ' +
        ' pw_vineyard.meals, ' +
        ' pw_vineyard.sqm, ' +
        ' pw_vineyard.events, ' +
        ' pw_vineyard.additional, ' +
        ' pw_vineyard.accommodation, ' +
        ' pw_vineyard.sale';


    const query = `SELECT ${defaultFields} FROM pw_vineyard WHERE pw_vineyard.id = ? LIMIT 1;
    SELECT id, title FROM pw_winetypes as \'allWineTypes\';
     SELECT pw_winetypes.title,
      pw_winetypes.id,
       pw_winetypes.colour,
        pw_winetypes.colour,
        pw_winetypes.is_important as \'isImportant\',
        pw_winetypes.is_active as \'isActive\',
        pw_winetypes.sort
         FROM pw_vineyard_winetypes WHERE pw_vineyard_winetypes.vineyard_id = ?`;

    connection.query(query, [id, id], function (error, results) {
        if (error) {
            result(error, null)
        } else {
            const parseItems = results[0].map(item => {
                item.features = []
                const location = item.location.split(',')
                item.paths = listToArray(item.paths, ',')
                item.isActive = item.isActive === 2
                item.location = [parseFloat(location[0]), parseFloat(location[1].replace(/\s+/g, ''))]
                if (item.accommodation === 2) {
                    item.features.push(featuresIndex('accommodation'))
                }
                if (item.additional === 2) {
                    item.features.push(featuresIndex('additional'))
                }
                if (item.events === 2) {
                    item.features.push(featuresIndex('events'))
                }
                if (item.meals === 2) {
                    item.features.push(featuresIndex('meals'))
                }
                if (item.sightseeing === 2) {
                    item.features.push(featuresIndex('sightseeing'))
                }
                if (item.tastings === 2) {
                    item.features.push(featuresIndex('tastings'))
                }
                if (item.sale === 2) {
                    item.features.push(featuresIndex('sale'))
                }
                item.wineTypes = results[1];
                delete item.meals
                delete item.events
                delete item.additional
                delete item.accommodation
                delete item.sightseeing
                delete item.tastings
                delete item.sale
                return item
            });
            result(parseItems[0], null)
        }
    })
}

module.exports = BackOffice
