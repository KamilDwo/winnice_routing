const logSqlError = require('../helpers/logSqlError.helper');


exports.saveToLog = (req, res) => {
    logSqlError(req);
    res.status(200);
    res.end();
};
