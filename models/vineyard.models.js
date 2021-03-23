const speakingurl = require('speakingurl');

const connection = require('../config/db.config');
const listToArray = require('../helpers/listToArray.helper');


const Vineyard = vineyard => {
    this.id = vineyard.id;
    this.name = vineyard.name;
};

Vineyard.findAll = result => {
    const defaultFields = `vineyards.id,
     vineyards.name,
     vineyards.dateAdd,
    vineyards.location,
    vineyards.provinceId,
      vineyards.isActive,
    GROUP_CONCAT(vineyards_paths.pathId) AS paths,
    GROUP_CONCAT(vineyards_features.featureId) AS features,
    GROUP_CONCAT(vineyards_organizations.organizationId) AS organizations,
    GROUP_CONCAT(vineyards_photos.photoFile) AS photos,
    GROUP_CONCAT(vineyards_winetypes.winetypeId) AS winetypes
    `;

    connection.query(`SELECT ${defaultFields} FROM vineyards
     LEFT JOIN vineyards_paths ON vineyards.id=vineyards_paths.vineyardId
       LEFT JOIN vineyards_organizations ON vineyards.id=vineyards_organizations.vineyardId
       LEFT JOIN vineyards_features ON vineyards.id=vineyards_features.vineyardId
       LEFT JOIN vineyards_photos ON vineyards.id=vineyards_photos.vineyardId
       LEFT JOIN vineyards_winetypes ON vineyards.id=vineyards_winetypes.vineyardId
       WHERE vineyards.isActive = 1
      GROUP BY vineyards.id`, (error, results) => {
        if (error) {
            result(null, error);
        }
        else {
            const parseItems = results.map(item => {
                const location = item.location.split(',');
                const objUrl = `${item.id}-${speakingurl(item.name, [])}`;
                const { photos } = item;
                let photosToReturn = [];
                if (item.photos && item.photos.length > 0) {
                    photosToReturn = photos.split(',');
                }

                return {
                    ...item,
                    paths: [...new Set(listToArray(item.paths, ','))],
                    organizations: [...new Set(listToArray(item.organizations, ','))],
                    features: [...new Set(listToArray(item.features, ','))],
                    winetypes: [...new Set(listToArray(item.winetypes, ','))],
                    photos: photosToReturn,
                    location: [parseFloat(location[0]), parseFloat(location[1].replace(/\s+/g, ''))],
                    url: objUrl,
                };
            });
            result(parseItems, null);
        }
    });
};

Vineyard.findById = (id, result) => {
    connection.query(`SELECT vineyards.id,
     vineyards.name,
     vineyards.dateAdd,
    vineyards.location,
    vineyards.provinceId,
      vineyards.isActive FROM vineyards LEFT JOIN vineyards_paths ON vineyards.id=vineyards_paths.vineyardId WHERE vineyards.id = ? GROUP BY vineyards.id LIMIT 1`, id, (error, results) => {
        if (error) {
            result(error, null);
        }
        else {
            const item = results[0];
            item.features = [];
            const location = item.location.split(',');
            item.isActive = item.isActive === 2;
            const objUrl = `${item.id}-${speakingurl(item.name, [])}`;
            item.location = [parseFloat(location[0]), parseFloat(location[1].replace(/\s+/g, ''))];
            item.paths = listToArray(item.paths, ',');
            item.url = objUrl;
            result(item, null);
        }
    });
};

module.exports = Vineyard;

