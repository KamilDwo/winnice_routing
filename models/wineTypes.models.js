const connection = require('../config/db.config');
const listToArray = require('../helpers/listToArray.helper');

const WineType = () => {};

WineType.findAll = result => {
    const defaultFields = `
     winetypes.id,
     winetypes.colour,
     winetypes.title,
     winetypes.isImportant,
     winetypes.isActive,
     winetypes.sort,
     GROUP_CONCAT(wines_provinces.provinceId) AS winetypes
    `;

    connection.query(`SET NAMES utf8; SELECT ${defaultFields} FROM winetypes
     LEFT JOIN wines_provinces ON winetypes.id=wines_provinces.wineTypeId
     WHERE winetypes.isActive = 1
     GROUP BY winetypes.id
    `, (error, results) => {
        if (error) {
            result(null, error);
        }
        else {
            const parseItems = results[1].map(item => ({
                ...item,
                provinces: [...new Set(listToArray(item.winetypes, ','))],
            }));
            result(parseItems, null);
        }
    });
};

module.exports = WineType;

