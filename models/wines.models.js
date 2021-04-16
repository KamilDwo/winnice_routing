const connection = require('../config/db.config');

const Wine = () => {};

Wine.findAll = result => {
    const defaultFields = `
     id,
     isActive,
     name,
     type
    `;

    connection.query(`SET NAMES utf8; SELECT ${defaultFields} FROM wines WHERE isActive = 1`, (error, results) => {
        if (error) {
            result(null, error);
        }
        else {
            const parseItems = results[1].map(item => ({
                ...item,
                provinces: [],
            }));
            result(parseItems, null);
        }
    });
};

module.exports = Wine;

