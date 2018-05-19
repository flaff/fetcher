# unfetcher
[![Build Status](https://travis-ci.org/flaff/fetcher.svg?branch=master)](https://travis-ci.org/flaff/fetcher)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
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