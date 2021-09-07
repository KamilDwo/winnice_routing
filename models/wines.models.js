const connection = require('../config/db.config');
const listToArray = require('../helpers/listToArray.helper');

const Wine = () => {};

Wine.findAll = result => {
    const defaultFields = `
     wines.id,
     wines.isActive,
     wines.name,
     wines.type,
     wines.taste,
     GROUP_CONCAT(wines_provinces.provinceId) AS provinces,
     GROUP_CONCAT(wines_strains.strainId) AS strains,
     GROUP_CONCAT(wines_meals.mealId) AS meals
    `;

    connection.query(`SET NAMES utf8;
     SELECT ${defaultFields} FROM wines
      LEFT JOIN wines_provinces ON wines.id=wines_provinces.wineId
      LEFT JOIN wines_strains ON wines.id=wines_strains.strainId
      LEFT JOIN wines_meals ON wines.id=wines_meals.wineId
       WHERE wines.isActive = 1
       GROUP BY wines.id
     `, (error, results) => {
        if (error) {
            result(null, error);
        }
        else {
            const parseItems = results[1].map(item => ({
                ...item,
                provinces: [...new Set(listToArray(item.provinces, ','))],
                strains: [...new Set(listToArray(item.strains, ','))],
                meals: [...new Set(listToArray(item.meals, ','))],
            }));
            result(parseItems, null);
        }
    });
};

module.exports = Wine;

