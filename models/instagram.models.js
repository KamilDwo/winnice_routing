'use strict'

require('dotenv').config()
const InstagramApi = require('instagram-web-api')
const { INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD } = process.env
const instagramClient = new InstagramApi({ username: INSTAGRAM_USERNAME, password: INSTAGRAM_PASSWORD })



const Instagram = () => {}

Instagram.getPhotosByUsername = (result, body) => {
    ;(async () => {
        await instagramClient.login()
        console.log('klient: ', instagramClient);
        const profile = await instagramClient.getProfile()
        console.log('profile', profile);
        result(profile)
    })()
};

module.exports = Instagram
