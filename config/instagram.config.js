'use strict';

require('dotenv').config()
const Instagram = require('instagram-web-api')
const { INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD } = process.env

const instagramClient = new Instagram({ INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD })
module.exports = instagramClient
