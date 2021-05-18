const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./server.ts'];

const doc = {
    info: {
        version: "1.0.0",
        title: "Polskie Winnice REST API",
        description: "Documentation automatically generated by the <b>swagger-autogen</b> module.",
    },
    explorer: true,
    schemes: ["https"],
    host: "polskiewinnice.ovh",
    servers: [
        {
            url: "https://polskiewinnice.ovh/api/v1",
        },
    ],
    basePath: "/",
    produces: "application/json",
};

swaggerAutogen(outputFile, endpointsFiles, doc);