declare namespace unfetcher {
    type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'DELETE';

    interface Options<Payload> {
        /** URL or function returning URL. Function receives request params as argument. */
        url: string | ((payload?: Payload) => string);
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
        check?: (response: any) => Promise<any>;
        headers?: {[key: string]: string};
    }

    interface Response<ResponseModel> {
        ok: boolean;
        status: number;
        statusText: string;
        url: string;
        clone: Response<ResponseModel>;
        text: () => string;
        json: () => ResponseModel;
        blob: () => Blob;
        headers: {[key: string]: string};
    }
}

export default class Fetcher<ResponseModel, Payload = void> {
    constructor(options: unfetcher.Options<Payload>);
    /** Automatically parses response as JSON. */
    fetch(payload?: Payload): Promise<ResponseModel>;
    /** More classic-like fetch call. Returns Response instead of parsed data. */
    fetchR(payload?: Payload): Promise<unfetcher.Response<ResponseModel>>;
    /** Aborts current Fetcher request if any */
    abort: () => void;
    /**
     * Fetch function called inside. Can be replaced with fetch ponyfill. Defaults to "window.fetch".
     * @see window.fetch
     */
    static f: (url: string, options: any) => Promise<any>;
    static onCatch: (error: any) => Promise<any>;
    /** Default response check method that decides when to reject. Rejects when response.ok is false. */
    static check: (response: any) => Promise<any>;
}

declare module 'fetcher' {
    export default Fetcher;
}