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
                : resolve({json: () => resolves})
        );

it('should create using new', () => {
    const fetcher = new Fetcher();
    expect(typeof fetcher.abort === 'function').toBe(true);
    expect(typeof fetcher.fetch === 'function').toBe(true);
    expect(typeof fetcher.fetchR === 'function').toBe(true);
});

it('should call provided static "Fetcher.f" fetch function', () => {
    const
        testFetcher = new Fetcher({url: TEST_URL}),
        fetchStub = sinon.stub();

    fetchStub.returns(new Promise((resolve) => resolve({})));
    Fetcher.f = fetchStub;

    testFetcher.fetch();
    expect(fetchStub.called).toBe(true);
});

it('should pass correct string payload', (done) => {
    Fetcher.f = (url, request) => {
        expect(request.body).toBe(TEST_STRING_PAYLOAD);
        done();
        return stubFetchPromise();
    };
    (new Fetcher({url: TEST_URL})).fetch(TEST_STRING_PAYLOAD);
});

it('should stringify object payload', (done) => {
    Fetcher.f = (url, request) => {
        expect(request.body).toBe(JSON.stringify(TEST_PAYLOAD));
        done();
        return stubFetchPromise();
    };
    (new Fetcher({url: TEST_URL})).fetch(TEST_PAYLOAD);
});

it('should parse string payload', (done) => {
    Fetcher.f = () => stubFetchPromise(TEST_RESPONSE);
    (new Fetcher({url: TEST_URL})).fetch()
        .then(data => {
            expect(data).toMatchObject(TEST_RESPONSE);
            done();
        });
});
