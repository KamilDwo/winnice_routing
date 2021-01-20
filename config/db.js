'use strict';

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'vilsone.home.pl',
    user: '11565381_winnice',
    password: '!w-SfX1JjPV8',
    database: '11565381_winnice'
});

connection.connect(function (err) {
    if (err) throw err;

    connection.query('set names utf8')
    console.log("Database Connected!");
});

const query = function (sql, callback) {
    connection.getConnection(function (err, conn) {
        if (err) {
            callback(err, null);
        } else {
            conn.query(sql, function (err, results) {
                callback(err, results);
            });
            conn.release();
        }
    });
};


module.exports = query;
