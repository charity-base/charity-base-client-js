# CharityBase Client Library (JavaScript)

A JavaScript client library for interacting with the CharityBase REST API.  For full documentation see the [CharityBase Docs](https://charity-base.github.io/charity-base-docs).

## Authorisation

Log in to the [CharityBase API Portal](https://charitybase.uk/api-portal) and create an API key.

## Install

With Yarn:

```bash
yarn add charity-base
```

Or npm:

```bash
npm install --save charity-base
```

This package makes use of the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) so be aware of the following:

### Client Side

Modern browsers have `fetch` in the window scope so you don't need to do anything however we recommend installing the [fetch polyfill](https://github.com/github/fetch) to support older browsers:

```bash
yarn add whatwg-fetch
```

### Server Side

If you're using `charity-base` from the backend you'll need to install [node-fetch](https://www.npmjs.com/package/node-fetch):

```bash
yarn add node-fetch
```

And import it like so:

```js
// server_code.js
const fetch = require('node-fetch')
const CharityBaseClient = require('charity-base')
...
```

## Example

Search for "homeless" charities with income range £100k - £1m, sorted by descending income:

```js
const CharityBaseClient = require('charity-base')

const charityBase = new CharityBaseClient({
  apiKey: 'my-api-key'
})

charityBase.charity.list({
  'fields': ['income.latest.total'],
  'search': 'homeless',
  'incomeRange': [100000, 1000000],
  'sort': 'income.latest.total:desc',
  'limit': 10,
  'skip': 0,
})
.then(res => {
  console.log(res.charities)
})
.catch(e => {
  console.log(e.message)
})
```

(Remember to replace `my-api-key` with your actual key, copied from the [CharityBase API Portal](https://charitybase.uk/api-portal))

## [Docs](https://charity-base.github.io/charity-base-docs)