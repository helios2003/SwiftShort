const shortID = require('./id');
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

    const id = shortID(url);
    const shortUrl = id;

    try {
        await URL.create({
            long_url: url,
            short_url: id 
        });

        console.log("URL created");
        res.json({ short_url: shortUrl });
    } catch (error) {
        console.error('Error creating URL:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

/*
@params req: request object (contains the shortened URL)
@params res: response object (contains the original URL)
*/
async function redirectURL(req, res) {
    const { short_url } = req.params;

    try {
        const result = await URL.findOne({ short_url });

        if (result) {
            console.log("URL retrieved");
            res.redirect(result.long_url);
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
    redirectURL
};
