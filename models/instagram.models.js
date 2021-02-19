'use strict'

const client = require('../config/instagram.config')

const Instagram = () => {}

Instagram.getPhotosByUsername = (result, body) => {
    ;(async () => {
        await client.login()
        const profile = await client.getProfile()
        result(profile)
    })()
};

module.exports = Instagram
