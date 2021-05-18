const connectionModels = require('../config/db.config');

const Paths = () => {};

Paths.findAll = (result: (arg0: any, arg1: null) => void, body: any) => {
    const defaultFields = `id, name, isActive, bounds`;

    connectionModels.query(`SET NAMES utf8; SELECT ${defaultFields} FROM paths`, (error: any, results: any[][]) => {
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
