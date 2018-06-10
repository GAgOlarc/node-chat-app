const generateMessage = (from, text) => ({
    from,
    text,
    createdAt: new Date().getTime()
});

const generateLocationMessage = (from, lat, lon) => ({
    from,
    url: `https://www.google.com/maps?q=${lat},${lon}`,
    createdAt: new Date().getTime()
});

module.exports = { generateMessage, generateLocationMessage };
