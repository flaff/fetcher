function Fetcher (options) {
    let controller;

    this.abort = () =>
        controller && controller.abort();

    this.fetch = (params) =>
        this.fetchR(params).then(r => r.json());

    this.fetchR = (params) => {
        const transform = options.transform || Fetcher.transform;

        if (!options.multiple) {
            this.abort();
            controller = Fetcher.ac && new Fetcher.ac();
        }

        return Fetcher.fetch(options.url.call ? options.url(params) : options.url, {
            credentials: options.credentials || Fetcher.credentials,
            headers: options.headers || Fetcher.headers,
            body: transform ? transform(params) : params,
            signal: controller && controller.signal,
            method: options.method
        })
            .then(options.check || Fetcher.check)
            .catch(Fetcher.onCatch)
    };
}

Fetcher.fetch = typeof fetch === 'function' && fetch.bind();
Fetcher.ac = typeof AbortController === 'function' && AbortController;

function _throw(e) {
    throw e;
}

Fetcher.check = (response) =>
    response.ok ? response : _throw(response);

Fetcher.onCatch = (error) =>
    error.name !== 'AbortError' && _throw(error);

export default Fetcher;