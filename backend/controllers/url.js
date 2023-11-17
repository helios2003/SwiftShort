const { v4: uuidv4 } = require('uuid');
const URL = require('../models/schema');

/*
@params req: request object (contains the original URL)
@params res: response object (contains the shortened URL)
 */
async function createURL(req, res) {
    let { url } = req.body;
    if (!url) {
        res.status(400).json({ message: 'URL is required' });
        return;
    }

    const id = uuidv4(5);
    url = url.replace(/(https?:\/\/)?(www\.)?/, '');
    const shortUrl = `http://localhost:3000/${id}`;

    try {
        await URL.create({
            long_url: url,
            short_url: shortUrl
        });

        console.log("URL created");
        res.json({ message: 'URL created' });
    } catch (error) {
        console.error('Error creating URL:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

/*
@params req: request object (contains the shortened URL)
@params res: response object (contains the original URL)
 */
async function getURL(req, res) {
    const { long_url } = req.params;

    try {
        const result = await URL.findOne({ long_url });

        if (result) {
            console.log("URL retrieved");
            res.json({ message: 'URL retrieved', original_url: result.short_url });
        } else {
            res.status(404).json({ message: 'URL not found' });
        }
    } catch (error) {
        console.error('Error retrieving URL:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    createURL,
    getURL
};
