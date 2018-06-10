const moment = require('moment');

const generateMessage = (from, text) => ({
    from,
    text,
    createdAt: moment().valueOf()
});

const generateLocationMessage = (from, lat, lon) => ({
    from,
    url: `https://www.google.com/maps?q=${lat},${lon}`,
    createdAt: moment().valueOf()
});

module.exports = { generateMessage, generateLocationMessage };
