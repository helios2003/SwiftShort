const crypto = require('crypto');

function shortID(long_url) {
    const hash = crypto.createHash('sha1').update(long_url).digest('hex');
    return hash.substring(0, 8);
}

module.exports = shortID;