const logSqlError = message => {
    // eslint-disable-next-line no-console
    console.log('~~[MySQL error]~~ ', message);
};

module.exports = logSqlError;
