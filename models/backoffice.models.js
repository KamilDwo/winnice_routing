'use strict'

require('dotenv').config()
const connection = require('../config/db.config')
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
    const defaultFields = `
     vineyards.id,
     vineyards.name,
     vineyards.dateAdd,
     vineyards.provinceId,
     vineyards.isActive, 
     (SELECT COUNT(vineyards_paths.id) FROM vineyards_paths WHERE vineyards_paths.vineyardId = vineyards.id) as 'paths', 
     (SELECT COUNT(vineyards_organizations.id) FROM vineyards_organizations WHERE vineyards_organizations.vineyardId = vineyards.id) as 'organizations'
     `


    connection.query(`SELECT ${defaultFields} FROM vineyards`, function (error, results) {
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


BackOffice.uploadVineyardImage = (req, result) => {
    const post  = {
        vineyardId: req.body.vineyardId,
        photoFile: req.file.filename
    }
    console.log(req.file);
    connection.query("INSERT INTO vineyards_photos SET ?", post, function (error) {
        if (error) {
            result(null, error)
        } else {        
            const moreFile = {
                filename: req.file.filename,
                thumbUrl: `https://polskiewinnice.ovh/images/${req.file.filename}`,
                uid: Math.random() + Math.random() + Math.random()
            }
            result(moreFile, null)
        }
    })
}


BackOffice.updateVineyardById = (req, result) => {
    const {id} = req.body;
    const {
        name, owners, yearOpen, sqm, postal, provinceId, address, city, locationX, locationY,
        phone, email, www, facebook, instagram, groundTilt, elevation, groundTiltDirection,
        groundType, description,
    } = req.body.values;
    const location = `${locationX}, ${locationY}`;

    const setData = `
    name=?,
    owners=?,
    yearOpen=?,
    sqm=?,
    postal=?,
    address=?,
    city='?',
    location=?,
    phone=?,
    email=?,
    www=?,
    facebook=?,
    instagram=?,
    groundTilt=?,
    elevation=?,
    groundTiltDirection=?,
    groundType=?,
    description=?,
    provinceId=?
    `;

    connection.query(`UPDATE vineyards SET ${setData} WHERE id=?`, [
        name, owners, yearOpen, sqm, postal, address, city, location, phone,
        email, www, facebook, instagram, groundTilt, elevation, groundTiltDirection,
        groundType, description,
        provinceId, id,
    ], function (error) {
        if (error) {
            result(error, null)
        } else {
            result({}, null);
        }
    })
}

BackOffice.getVineyardById = (id, result) => {
    const defaultFields = `
    vineyards.id,
        vineyards.name,
       vineyards.dateAdd,
        vineyards.location,
        vineyards.provinceId,
         vineyards.tastings,
         vineyards.yearOpen,
        vineyards.owners, 
         vineyards.elevation, 
         vineyards.sightseeing,
         vineyards.meals,
         vineyards.postal,
         vineyards.address,
         vineyards.city,
        vineyards.sqm, 
       vineyards.events, 
         vineyards.additional,
        vineyards.accommodation, 
       vineyards.sale`

    const defaultFields2 = `
    winetypes.title,
        winetypes.id,
        winetypes.colour,
        winetypes.colour,
        winetypes.isImportant,
        winetypes.isActive,
        winetypes.sort
        `

    const defaultFields3 = `
    organizations.name,
        organizations.id,
        organizations.isActive,
        organizations.sort
        `

    const defaultFields4 = `
    paths.name,
        paths.id,
        paths.isActive,
        paths.sort
        `

    const query = `SELECT ${defaultFields} FROM vineyards WHERE vineyards.id = ? LIMIT 1;
    SELECT * FROM winetypes;
    SELECT * FROM organizations;
    SELECT * FROM paths;
    SELECT ${defaultFields2} FROM vineyards_winetypes LEFT JOIN winetypes ON vineyards_winetypes.winetypeId=winetypes.id WHERE vineyards_winetypes.vineyardId = ? GROUP BY vineyards_winetypes.winetypeId;
    SELECT ${defaultFields3} FROM vineyards_organizations LEFT JOIN organizations ON vineyards_organizations.organizationId=organizations.id WHERE vineyards_organizations.vineyardId = ? GROUP BY vineyards_organizations.organizationId;
    SELECT ${defaultFields4} FROM vineyards_paths LEFT JOIN paths ON vineyards_paths.pathId=paths.id WHERE vineyards_paths.vineyardId = ? GROUP BY vineyards_paths.pathId;
    SELECT photoFile FROM vineyards_photos WHERE vineyardId = ?;
     `

    connection.query(query, [id, id, id, id, id], function (error, results) {
        if (error) {
            result(error, null)
        } else {
            const parseItems = results[0].map(item => {
                item.features = []
                const location = item.location.split(',')
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
                item.allWineTypes = results[1]
                item.wineTypes = results[4]
                item.allOrganizations = results[2]
                item.allPaths = results[3]
                item.organizations = results[5];
                item.paths = results[6];
                item.photos = results[7].map(photo => {
                    return {
                        uid: Math.random(),
                        name: photo.photoFile,
                        thumbUrl: photo.photoFile
                    }
                })
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
