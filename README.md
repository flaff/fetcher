# unfetcher
![npm](https://img.shields.io/npm/v/unfetcher.svg)
[![Build Status](https://travis-ci.org/flaff/unfetcher.svg?branch=master)](https://travis-ci.org/flaff/fetcher)
![npm](https://img.shields.io/npm/l/unfetcher.svg)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/unfetcher.svg)](https://bundlephobia.com/result?p=unfetcher)

> [unfetch](https://github.com/developit/unfetch) wrapper for creating predefined abortable requests with Typescript support

## Features
- Uses a modified version of [unfetch](https://github.com/developit/unfetch) internally _(Thanks to developit and other contributors ✌, see LICENSE-unfetch.md)_
- Supports older browsers if `Promise` is polyfilled _([promise-polyfill](https://www.npmjs.com/package/promise-polyfill) - ~1kb gzipped)_
- Compact - about 740B gzipped
- Standalone - no dependencies
- Abortable without polyfills

## Install
Save as dependency using [npm](https://npmjs.com/)
```bash
npm i unfetcher
```

Import in your module bundler
```javascript
import Fetcher from 'unfetcher'; // ES6
var Fetcher = require('unfetcher'); // CommonJS
```

Or expose globally as `Unfetcher` using [UMD](https://github.com/umdjs/umd) build from [unpkg](https://unpkg.com)
```html
<script src="//unpkg.com/unfetcher/dist/unfetcher.umd.js"></script>
```

## Specs
- rejects an `ABORT` message `Error` on request abort
- rejects an `TIMEOUT` message `Error` on request timeout
- `Error` with `ABORT` message is catched internally by default in `Fetcher.onCatch`, to change this behavior modify this static method

Fetcher constructor options:

Option | Type | Description
--- | --- | ---
`url` | `string` or `(payload: Payload) => string` | Defines request URL. Can be payload-based using function.
`method` | `string` | Request type. Defaults to `GET`
`credentials` | `string`, `"include"` or `"omit"` | Use cookies in request. Defaults to `Fetcher.credentials` or `include`
`headers` | `object` | Map of headers to be included. Defaults to Fetcher.headers (none by default)
`prepare` | `(params?: Payload, request?: Request) => any` | Method to transform request body and/or request before sending. Defaults to Fetcher.prepare (none by default)
`transform` | `(request?: Request) => ResponseType` | Method to parse response from server called inside `fetch` before resolve. Also available as "transform" in response of `fetchR`.
`multiple` | `boolean` | Allows multiple request of same type without aborting. Defaults to `false`.
`timeout` | `number` | Time in milliseconds to timeout. Defaults to `Fetcher.timeout` or `0` (never)

## Usage
Optionally configure for `application/json` communication to reduce boilerplate:
```javascript
import Fetcher from 'unfetcher';

Fetcher.prepare = (params) => JSON.stringify(params);
Fetcher.headers = {'Content-Type': 'application/json'};
// Fetcher.transform = (params, request) => JSON.parse(params); // default behavior
```

Javascript, GET:
```javascript
import Fetcher from 'unfetcher';

const GETPreactStars = new Fetcher({
    url: 'https://api.github.com/repos/developit/preact'
});

GETPreactStars.fetch()
    .then((data) => console.log(data.watchers_count));

// or
GETPreactStars.fetchR()
    .then((response) => response.json())
    .then((data) => console.log(data.watchers_count));
```

Typescript, GET:
```typescript
import Fetcher from 'unfetcher';

// Define API response model
type GithubRepoResponse = {
    watchers_count: number;
    // ...
};

const GETPreactStars = new Fetcher<GithubRepoResponse>({
    url: 'https://api.github.com/repos/developit/preact'
});

GETPreactStars.fetch()
    .then((data) => console.log(data.watchers_count)); // strongly typed
```
