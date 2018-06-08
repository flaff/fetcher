function Fetcher(options) {
    let abort;

    this.abort = () =>
        abort && abort();

    this.fetch = (params) =>
        this.fetchR(params).then(r => r.transform ? r.transform() : r.json());

    this.fetchR = (params) => {
        !options.multiple && this.abort();

        return new Promise((resolve, reject) => {
                const
                    timeout = options.timeout || Fetcher.timeout,
                    prepare = options.prepare || Fetcher.prepare,
                    transform = options.transform || Fetcher.transform,
                    headers = options.headers || Fetcher.headers || [],
                    request = new XMLHttpRequest();

                request.open(options.method || 'GET', options.url.call ? options.url(params) : options.url, true);

                abort = () => {
                    abort = null;
                    request.abort();
                    reject(new Error('ABORTED'));
                };

                for (const header in headers) {
                    request.setRequestHeader(header, headers[header]);
                }

                request.withCredentials = (options.credentials || Fetcher.credentials) == 'include';

                request.timeout = timeout;
                request.ontimeout = () => {
                    reject(new Error('TIMEOUT'));
                };

                request.onload = () => {
                    abort = null;
                    resolve(response());
                };

            request.send(prepare ? prepare(params, request) : params);

                function response() {
                    let keys = [],
                        all = [],
                        headers = {},
                        header;

                    request.getAllResponseHeaders().replace(/^(.*?):\s*?([\s\S]*?)$/gm, (m, key, value) => {
                        keys.push(key = key.toLowerCase());
                        all.push([key, value]);
                        header = headers[key];
                        headers[key] = header ? `${header},${value}` : value;
                    });

                    return {
                        ok: (request.status / 100 | 0) == 2,		// 200-299
                        status: request.status,
                        statusText: request.statusText,
                        url: request.responseURL,
                        clone: response,
                        text: () => Promise.resolve(request.responseText),
                        json: () => Promise.resolve(request.responseText).then(JSON.parse),
                        blob: () => Promise.resolve(new Blob([request.response])),
                        transform: transform && (() => Promise.resolve(request).then(transform)),
                        headers: {
                            keys: () => keys,
                            entries: () => all,
                            get: n => headers[n.toLowerCase()],
                            has: n => n.toLowerCase() in headers
                        }
                    };
                }
            }
        )

            .then(options.check || Fetcher.check)
            .catch(Fetcher.onCatch)
    }
    ;
}

function _throw(e) {
    throw e;
}

Fetcher.check = (response) =>
    response.ok ? response : _throw(response);

Fetcher.onCatch = (error) =>
    error.message != 'ABORTED' && _throw(error);

export default Fetcher;