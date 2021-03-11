'use strict'

const connection = require('../config/db.config')
const speakingurl = require('speakingurl')
const listToArray = require('../helpers/listToArray.helper')
const featuresIndex = require('../helpers/featuresIndex.helper')

const Vineyard = vineyard => {
    this.id = vineyard.id
    this.name = vineyard.name
};

const defaultFields = `vineyards.id,
     vineyards.name,
     vineyards.dateAdd,
    vineyards.location,
    vineyards.provinceId,
     vineyards.tastings,
     vineyards.sightseeing, 
     vineyards.meals, 
     vineyards.events, 
     vineyards.additional,
     vineyards.accommodation,
     vineyards.sale
    GROUP_CONCAT(vineyards_paths.pathId) AS paths
    `


Vineyard.findAll = result => {
    connection.query(`SELECT ${defaultFields} FROM vineyards LEFT JOIN vineyards_paths ON vineyards.id=vineyards_paths.vineyardId GROUP BY vineyards.id`, function (error, results) {
        if (error) {
            result(error, null)
        } else {
            const parseItems = results.map(item => {
                item.features = []
                const location = item.location.split(',')
                item.paths = listToArray(item.paths, ',')
                item.isActive = item.isActive === 2
                const objUrl = `${item.id}-${speakingurl(item.name, [])}`
                item.location = [parseFloat(location[0]), parseFloat(location[1].replace(/\s+/g, ''))]
                item.url = objUrl
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
                return item
            });
            result(parseItems, null)
        }
    });
};

Vineyard.findById = (id, result) => {
    connection.query(`SELECT ${defaultFields} FROM vineyards LEFT JOIN vineyards_paths ON vineyards.id=vineyards_paths.vineyardId WHERE vineyards.id = ? GROUP BY vineyards.id LIMIT 1`, id, function (error, results) {
        if (error) {
            result(error, null)
        } else {
            const item = results[0]
            item.features = []
            const location = item.location.split(',')
            item.isActive = item.isActive === 2
            const objUrl = `${item.id}-${speakingurl(item.name, [])}`
            item.location = [parseFloat(location[0]), parseFloat(location[1].replace(/\s+/g, ''))]
            item.paths = listToArray(item.paths, ',')
            item.url = objUrl
            result(item, null)
        }
    })
}

module.exports = Vineyard

