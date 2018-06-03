declare namespace unfetcher {
    type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'DELETE';

    interface Options<R, Payload> {
        /** URL or function returning URL. Function receives request params as argument. */
        url: string | ((payload: Payload) => string);
        /** Method to transform request body before sending. */
        transform?: (payload: Payload) => any;
        /** Use cookies in request. Defaults to "include". */
        credentials?: 'include' | 'omit';
        /** Allows multiple request of same type without aborting. Defaults to "false". */
        multiple?: boolean;
        /** Request type. Defaults to 'get'.*/
        method?: Method;
        /**
         * Response check method that decides when to reject. Defaults to "Fetcher.check".
         * @see Fetcher.check
         */
        check?: (response: Response<R>) => Promise<any>;
        headers?: {[key: string]: string};
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
    /**
     * Fetch function called inside. Can be replaced with fetch ponyfill. Defaults to "window.fetch".
     * @see window.fetch
     */
    static f: (url: string, options: any) => Promise<any>;
    /**
     * AbortController to be used inside.
     */
    static C: any;
    static onCatch: (error: any) => Promise<any>;
    /** Default response check method that decides when to reject. Rejects when response.ok is false. */
    static check: (response: any) => Promise<any>;
    /** Default headers used if none specified */
    static headers?: {[key: string]: string};
    /** Default credentials parameter used if none specified */
    static credentials?: string;
}

declare module 'fetcher' {
    export default Fetcher;
}