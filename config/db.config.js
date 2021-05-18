const mysql = require('mysql');

const connection = mysql.createPool({
    host: 'vilsone.home.pl',
    user: '11565381_winnice',
    password: '!w-SfX1JjPV8',
    database: '11565381_winnice',
    waitForConnections: true,
    multipleStatements: true,
    charset: 'utf8mb4_polish_ci',
});

module.exports = connection;
