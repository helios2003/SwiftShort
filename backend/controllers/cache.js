const Redis = require('redis');
const URL = require('../models/schema');
const client = Redis.createClient();

async function getTopURLs() {
    const URLs = await URL.countDocuments();
    const topURLs = Math.ceil(URLs);
    const listURLs = await URL.find({}).sort({
        last_visited: -1
    }).limit(topURLs);

    return listURLs;
}

async function updateTopURLs() {
    try {
        client.on('connect', async () => {
            await client.del('topURLs');
            const listURLs = await getTopURLs();

            for (const url of listURLs) {
                const longURL = url.long_url;
                const shortURL = url.short_url;
                const timestaken = url.last_visited.toISOString();
                await client.zadd('topURLs', longURL, shortURL, timestaken);
            }
        });
    } catch (error) {
        console.error("Error updating top URLs in Redis cache:", error.message);
    }
}

module.exports = {
    updateTopURLs,
    getTopURLs
};
