'use strict';

const connection = require('../config/db.config');

const News = news => {
    this.id = news.id;
    this.type = news.type;
    this.message = news.message;
};
