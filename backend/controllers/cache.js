const Redis = require('ioredis');
const URL = require('../models/schema');
const client = Redis.createClient({
    host: 'localhost',
    port: 6379,
}
);

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
