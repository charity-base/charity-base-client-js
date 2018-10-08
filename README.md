# CharityBase Client Library (JavaScript)

A JavaScript client library for interacting with the CharityBase REST API.

## Installation

```
npm install --save charity-base
```

## Authorisation

Log in to the [CharityBase API Portal](https://charitybase.uk/api-portal) and create an API key.

## Example

Search for "homeless" charities with income range £100k - £1m, sorted by descending income:

```js
const charityBase = require('charity-base')({
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
