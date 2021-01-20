'use strict';

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'vilsone.home.pl',
    user: '11565381_winnice',
    password: '!w-SfX1JjPV8',
    database: '11565381_winnice'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
});

connection.query('set names utf8');

module.exports = connection;
