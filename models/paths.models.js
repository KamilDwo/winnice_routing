'use strict'

const connection = require('../config/db.config')

const Paths = () => {}



Paths.findAll = (result, body) => {
    let defaultFields = 'id,' +
        ' name,' +
        ' is_active as \'isActive\',' +
        ' bounds'

    connection.query(`SELECT ${defaultFields} FROM pw_paths`, function (err, res) {
        if (err) {
            result(err, null)
        } else {
            const parseItems = res.map(item => {
                item.isActive = item.isActive === 2
                item.bounds = item.bounds.split(',')
                let itemBounds
                itemBounds = item.bounds.map(bound => parseFloat(bound))
                item.bounds = itemBounds && itemBounds.length > 1 ? itemBounds : null
                return item
            });
            result(parseItems)
        }
    })
}

module.exports = Paths
