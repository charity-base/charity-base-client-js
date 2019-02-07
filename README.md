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