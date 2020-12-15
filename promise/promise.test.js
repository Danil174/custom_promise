const { beforeEach, expect } = require('@jest/globals');
const { errorForEach } = require('verror');
const CustomPromise = require('./promise');

const t = setTimeout

describe('custom promise', () => {
    let promise;
    let executor;

    const successResult = 42;
    const errorResult = 'error!';

    beforeEach(() => {
        executor = jest.fn((res) => t(() => res(successResult), 150));
        promise = new CustomPromise(executor);
    })

    test('should exist and to be typeof function', () => {
        expect(CustomPromise).toBeDefined();
        expect(typeof CustomPromise).toBe('function');
    })

    test('instance should have methods: then, catch, finally', () => {
        expect(promise.then).toBeDefined();
        expect(promise.catch).toBeDefined();
        expect(promise.finally).toBeDefined();
    })

    test('should call executor function', () => {
        expect(executor).toHaveBeenCalled();
    })

    test('should get data in "then" and chain them', async () => {
       const result = await promise.then(num => num).then(num => num * 2);
       expect(result).toBe(successResult * 2);
    })

    test('should get data in "then" and chain them', async () => {
        const errorexecutor = (_, reject) => t(() => reject(errorResult), 150);
        const errorPromise = new CustomPromise(errorexecutor);

        return new Promise(resolve => {
            errorPromise.catch(error => {
                expect(error).toBe(errorResult);
                resolve();
            });
        })
    })
    
    test('should call finally method', async () => {
        const finallySpy = jest.fn(() => {});
        await promise.finally(finallySpy);

        expect(finallySpy).toHaveBeenCalled();
    })
});