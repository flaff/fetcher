import Fetcher from './index';
import sinon from 'sinon';

const
    TEST_URL = 'http://sampleurl',
    TEST_STRING_PAYLOAD = 'stringPayload',
    TEST_PAYLOAD = {a: 1, b: 2, c: 3},
    TEST_RESPONSE = {a: 2, b: 3, c: 4},
    stubFetchPromise = (resolves, rejects) =>
        new Promise((resolve, reject) =>
            rejects
                ? reject(rejects)
                : resolve({json: () => resolves, ok: true})
        );

it('should create using new', () => {
    const fetcher = new Fetcher();
    expect(typeof fetcher.abort === 'function').toBe(true);
    expect(typeof fetcher.fetch === 'function').toBe(true);
    expect(typeof fetcher.fetchR === 'function').toBe(true);
});
