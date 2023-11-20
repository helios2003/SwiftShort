const Redis = require('ioredis');
const URL = require('./url');
const redis = new Redis({host: '127.0.0.1', port: 6379});

async function getTopURLs() {
    const URLs = await URL.countDocuments();
    const topURLs = Math.ceil(URLs * 0.05);
    const listURLs = await URL.find({}).sort({
        last_visited: -1
    })
        .limit(topURLs);

    return listURLs;
}

async function updateTopURLs() {
    try {
        await redis.del('topURLs');
        const listURLs = await getTopURLs();
        for (const url of listURLs) {
            const longURL = url.long_url;
            const shortURL = url.short_url;
            const timestaken = url.last_visited.toISOString();
            await redis.zadd('topURLs', longURL, shortURL, timestaken);
        }
    }
    catch (error) {
        console.error("Error updating top URLs in Redis cache:", error.message);
    }
}

module.exports = {
    updateTopURLs,
    getTopURLs
};