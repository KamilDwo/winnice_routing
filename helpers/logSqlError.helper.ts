const logSqlError = (message: string) => {
    // eslint-disable-next-line no-console
    console.log('~~[MySQL error]~~ ', message);
    return {
        error: message,
    };
};

export default logSqlError;
