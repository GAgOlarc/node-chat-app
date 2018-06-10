const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('Should generate correct message object', () => {
        const from = 'Jen';
        const text = 'Some message';
        const message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('Should generate correct location object', () => {
        const from = 'Admin';
        const lat = 47.8638056;
        const lon = 17.2510891;
        const url = 'https://www.google.com/maps?q=47.8638056,17.2510891';
        const message = generateLocationMessage(from, lat, lon);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    });
});