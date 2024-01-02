const { createClient } = require('redis');
const dotenv = require('dotenv');
dotenv.config();
const URL = require('../models/schema');
const client = new createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_PASSWORD,
        port: process.env.REDIS_PORT
    }
});

/*
    Lists the top 5% of URLs in the Redis cache.
*/
async function getTopURLs() {
    try {
        const URLs = await URL.countDocuments();
        const topURLs = Math.ceil(0.05 * URLs);
        const listURLs = await URL.find({}).sort({
            last_visited: -1
        }).limit(topURLs);

        return listURLs;
    } catch (error) {
        console.error('Error getting top URLs:', error.message);
        throw error;
    }
}

/*
    Updates the top URLs in the Redis after deleting it's old contents and 
    then adding the new ones as returned by the getTopURLs() function.
*/
async function updateTopURLs() {
    try {
        await client.del('topURLs');
        const listURLs = await getTopURLs();

        for (const url of listURLs) {
            const longURL = url.long_url;
            const shortURL = url.short_url;
            await client.set(longURL, shortURL);
        }
    } catch (error) {
        console.error('Error updating top URLs in Redis cache:', error.message);
    }
}

module.exports = {
    updateTopURLs,
    getTopURLs
};
