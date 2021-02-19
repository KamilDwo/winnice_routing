'use strict';

require('dotenv').config()
const Instagram = require('instagram-web-api')
const { INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD } = process.env
console.log(INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD);
const instagramClient = new Instagram({ INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD })
console.log(instagramClient);
module.exports = instagramClient
