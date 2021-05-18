const connectionModels = require('../config/db.config');

const Paths = () => {};

Paths.findAll = result => {
    const defaultFields = `id, name, isActive, bounds`;

    connectionModels.query(`SET NAMES utf8; SELECT ${defaultFields} FROM paths`, (error, results) => {
        if (error) {
            result(error, null);
        }
        else {
            const parseItems = results[1].map(item => ({
                ...item,
                isActive: item.isActive,
                bounds: item.bounds,
            }));
            result(parseItems, null);
        }
    });
};

module.exports = Paths;
