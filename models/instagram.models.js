'use strict'

const client = require('../config/instagram.config')

const Instagram = () => {}

Instagram.getPhotosByUsername = (result, body) => {
    ;(async () => {
        await client.login()
        console.log('klient: ', client);
        const profile = await client.getProfile()
        console.log(profile);
        result(profile)
    })()
};

module.exports = Instagram
