function Fetcher (options) {
    let controller;

    this.abort = () =>
        controller && controller.abort();

    this.fetch = (params) =>
        this.fetchR(params).then(r => r.json());

    this.fetchR = (params) => {
        if (!options.multiple) {
            this.abort();
            controller = Fetcher.C && new Fetcher.C();
        }

        return Fetcher.f(options.url.call ? options.url(params) : options.url, {
            credentials: options.credentials || 'include',
            headers: options.headers,
            body: options.transform ? options.transform(params) : params,
            signal: controller && controller.signal,
            method: options.method
        })
            .then(options.check || Fetcher.check)
            .catch(Fetcher.onCatch)
    };
}

Fetcher.f = typeof fetch === 'function' && fetch.bind();
Fetcher.C = typeof AbortController === 'function' && AbortController.prototype;

function _throw(e) {
    throw e;
}

Fetcher.check = (response) =>
    response.ok ? response : _throw(response);

Fetcher.onCatch = (error) =>
    error.name !== 'AbortError' && _throw(error);

export default Fetcher;