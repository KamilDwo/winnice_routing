const connection = require('../config/db.config');

const Paths = () => {};


// eslint-disable-next-line no-unused-vars
Paths.findAll = (result, body) => {
    const defaultFields = `id,
         name,
         isActive,
        bounds`;

    connection.query(`SELECT ${defaultFields} FROM paths`, (error, results) => {
        if (error) {
            result(error, null);
        }
        else {
            console.log(results)
            const parseItems = results.map(item => ({
                ...item,
                isActive: item.isActive,
                bounds: JSON.parse(item.bounds),
            }));
            result(parseItems, null);
        }
    });
};

module.exports = Paths;
