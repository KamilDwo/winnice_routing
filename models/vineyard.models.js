'use strict'

const connection = require('../config/db.config')
const speakingurl = require('speakingurl')
const listToArray = require('../helpers/listToArray.helper')
const featuresIndex = require('../helpers/featuresIndex.helper')

const Vineyard = vineyard => {
    this.id = vineyard.id
    this.name = vineyard.name
};

const defaultFields = 'pw_vineyard.id,' +
    ' pw_vineyard.name,' +
    ' pw_vineyard.date_add as \'dateAdd\',' +
    ' pw_vineyard.location,' +
    ' pw_vineyard.province_id as \'provinceId\',' +
    ' pw_vineyard.image_1 as \'image1\',' +
    ' pw_vineyard.tastings, ' +
    ' pw_vineyard.sightseeing, ' +
    ' pw_vineyard.meals, ' +
    ' pw_vineyard.events, ' +
    ' pw_vineyard.additional, ' +
    ' pw_vineyard.accommodation, ' +
    ' pw_vineyard.sale, ' +
    ' GROUP_CONCAT(pw_vineyard_paths.path_id) AS paths, ' +
    ' pw_vineyard.marker_id as \'markerId\''


Vineyard.findAll = result => {
    connection.query(`SELECT ${defaultFields} FROM pw_vineyard LEFT JOIN pw_vineyard_paths ON pw_vineyard.id=pw_vineyard_paths.vineyard_id GROUP BY pw_vineyard.id`, function (err, res) {
        if (err) {
            result(err, null)
        } else {
            const parseItems = res.map(item => {
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
            result(parseItems)
        }
    });
};

Vineyard.findById = (id, result) => {
    connection.query(`SELECT ${defaultFields} FROM pw_vineyard LEFT JOIN pw_vineyard_paths ON pw_vineyard.id=pw_vineyard_paths.vineyard_id WHERE pw_vineyard.id = ? GROUP BY pw_vineyard.id LIMIT 1`, id, function (err, res) {
        if (err) {
            result(err, null)
        } else {
            const item = res[0]
            item.features = []
            const location = item.location.split(',')
            item.isActive = item.isActive === 2
            const objUrl = `${item.id}-${speakingurl(item.name, [])}`
            item.location = [parseFloat(location[0]), parseFloat(location[1].replace(/\s+/g, ''))]
            item.paths = listToArray(item.paths, ',')
            item.url = objUrl
            result(item)
        }
    })
}

module.exports = Vineyard

