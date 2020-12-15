const CustomPromise = require('./promise');

describe('custom promise', () => {
    test('should exist and to be typeof function', () => {
        expect(CustomPromise).toBeDefined();
        expect(typeof CustomPromise).toBe('function');
    })
});