function Fetcher (options) {
    let controller;

    this.abort = () =>
        controller && controller.abort();

    this.fetch = (params) =>
        this.fetchR(params).then(r => r.json());

    this.fetchR = (params) => {
        !options.multiple && this.abort();
        controller = new AbortController();

        return Fetcher.f(options.url.call ? options.url(params) : options.url, {
            credentials: options.credentials || 'include',
            headers: options.headers,
            body: options.transform ? options.transform(params) : params,
            signal: controller.signal
        })
            .then(options.check || Fetcher.check)
            .catch(Fetcher.onCatch)
    };
}
Fetcher.f = window.fetch;

Fetcher.check = (response) =>
    response.ok ? response : Promise.reject(response);

Fetcher.onCatch = (error) =>
    error.name !== 'AbortError' && Promise.reject(error);

export default Fetcher;