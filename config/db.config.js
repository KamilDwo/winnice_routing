const mysql = require('mysql2');


const connection = mysql.createPool({
    host: 'vilsone.home.pl',
    user: '11565381_winnice',
    password: '!w-SfX1JjPV8',
    database: '11565381_winnice',
    waitForConnections: true,
    multipleStatements: true,
});
connection.query("SET NAMES utf8");
module.exports = connection;
