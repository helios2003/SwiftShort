const { createClient } = require('redis')
const dotenv = require('dotenv')
dotenv.config()
const URL = require('../models/schema')

// Create a Redis client instance
const client = createClient({ legacyMode: true });

// Function to connect the Redis client 
async function connectRedis () {
    try {
      await client.connect()
    } catch (err) {
      console.log('Error connecting to Redis:', err)
    }
}

/*
    Lists the top 5% of URLs in the Redis cache.
*/
async function getTopURLs() {
    try {
        const URLs = await URL.countDocuments();
        const topURLs =  Math.ceil(URLs * 0.05);
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
    Updates the top URLs in the Redis after deleting its old contents and 
    then adding the new ones as returned by the getTopURLs() function.
*/
async function updateTopURLs() {
    try {
        await client.flushAll((err, succeeded) => {
            console.log(succeeded); 
        });
        const listURLs = await getTopURLs();
        for (const url of listURLs) {
            const longURL = url.long_url
            const shortURL = url.short_url
            client.set(longURL, shortURL)
            console.log("successful")
        }
    } catch (error) {
        console.error('Error updating top URLs in Redis cache:', error.message);
    }
}

connectRedis()
updateTopURLs()

module.exports = { client }
