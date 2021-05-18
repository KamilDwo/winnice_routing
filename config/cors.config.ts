const allowList = ['http://localhost:9000/', 'https://winnice.heartit.pl/'];

const corsOptions = (req: { header: (arg0: string) => string; }, callback: (arg0: null, arg1: { origin: boolean; }) => void) => {
    let corsOptions;
    if (allowList.indexOf(req.header('Origin')) !== -1) {
        corsOptions = {
            origin: true,
        };
    }
    else {
        corsOptions = {
            origin: false,
        };
    }
    callback(null, corsOptions);
};

export { corsOptions };

