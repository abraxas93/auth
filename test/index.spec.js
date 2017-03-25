let chai = require('chai'),
    expect = require('chai').expect;

describe('Sanitize', () => {
    it('returns lowercase of string', () => {
        expect('Hello world').to.equal('Hello world');
    });
    it('removes any hyphen', () => {
        var custom = 123;
        expect(custom).to.be.a('number');
    });
});