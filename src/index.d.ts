declare namespace unfetcher {
    type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'DELETE';

    interface Options<ResponseType, Payload> {
        /** URL or function returning URL. Function receives request params as argument. */
        url: string | ((payload: Payload) => string);
        /** Request type. Defaults to `GET`.*/
        method?: Method;
        /** Use cookies in request. Defaults to Fetcher.credentials (none by default) or `include` */
        credentials?: 'include' | 'omit';
        /** Map of headers to be included. Defaults to Fetcher.headers (none by default) */
        headers?: {[key: string]: string};
        /** Method to transform request body and/or request before sending. Defaults to Fetcher.prepare (none by default) */
        prepare?: (params?: Payload, request?: Request) => any;
        /** Method to parse response from server called inside `fetch` before resolve. Also available as `transform` in response of `fetchR`. */
        transform?: (request?: Request) => ResponseType;
        /** Allows multiple request of same type without aborting. Defaults to `false`. */
        multiple?: boolean;
        /**
         * Response check method that decides when to reject. Defaults to `Fetcher.check`.
         * @see Fetcher.check
         */
        check?: (response: Response<ResponseType>) => Promise<any>;
        /** Time in milliseconds to timeout */
        timeout?: number;
    }

    interface Response<R> {
        ok: boolean;
        status: number;
        statusText: string;
        url: string;
        clone: Response<R>;
        text: () => string;
        json: () => R;
        blob: () => Blob;
        headers: {[key: string]: string};

        transform: () => R;
    }
}

export default class Fetcher<Response, Payload = void> {
    constructor(options: unfetcher.Options<Response, Payload>);
    /** Automatically parses response as JSON. */
    fetch(payload?: Payload): Promise<Response>;
    /** More classic-like fetch call. Returns Response instead of parsed data. */
    fetchR(payload?: Payload): Promise<unfetcher.Response<Response>>;
    /** Aborts current Fetcher request if any */
    abort: () => void;
    static onCatch: (error: any) => Promise<any>;
    /** Default response check method that decides when to reject. Rejects when response.ok is false. */
    static check: (response: any) => Promise<any>;
    /** Default headers used if none specified */
    static headers?: {[key: string]: string};
    /** Default credentials parameter used if none specified */
    static credentials?: string;
    /** Default method to transform request body and/or request before sending. (none by default) */
    static prepare?: (params: any, request: Request) => any;
    /** Method to parse response from server called inside "fetch" before resolve instead of "JSON.stringify" if provided.
     * Also available as "transform" in response of "fetchR". (none by default) */
    static transform?: (request: Request) => any;
    /** Time in milliseconds to timeout */
    static timeout?: number;
}

declare module 'fetcher' {
    export default Fetcher;
}