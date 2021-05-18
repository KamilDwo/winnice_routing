const allowList = ['http://localhost:9000/', 'https://winnice.heartit.pl/'];
const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    if (allowList.indexOf(req.header('Origin')) !== -1) {
        corsOptions = {
            origin: true,
        } ;
    }
    else {
        corsOptions = {
            origin: false,
        } ;
    }
    callback(null, corsOptions);
};

module.exports = corsOptionsDelegate;
