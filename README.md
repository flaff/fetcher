# unfetcher
![npm](https://img.shields.io/npm/v/unfetcher.svg)
[![Build Status](https://travis-ci.org/flaff/unfetcher.svg?branch=master)](https://travis-ci.org/flaff/fetcher)
![npm](https://img.shields.io/npm/l/unfetcher.svg)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/unfetcher.svg)](https://bundlephobia.com/result?p=unfetcher)

> Fetch wrapper for creating predefined requests

## Install
Save as dependency using [npm](https://npmjs.com/)
```bash
npm install --save unfetcher
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

## Usage

Supports usage of [ponyfill](https://ponyfill.com) fetch (e.g. [unfetch](https://github.com/developit/unfetch))
```javascript
import Fetcher from 'unfetcher';
import fetch from 'unfetch';

Fetcher.f = fetch;
```

## API

## ⚠ Good to know
- catches `AbortError` internally by default
- uses `include` credentials option by default