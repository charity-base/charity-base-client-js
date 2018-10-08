const { fetchJSON, stringifyQuery } = require('../helpers')

const ALLOWED_KEYS = [
  'apiKey',
  'fields',
  'ids.GB-CHC',
  'search',
  'incomeRange',
  'addressWithin',
  'areasOfOperation.id',
  'causes.id',
  'beneficiaries.id',
  'operations.id',
  'sort',
  'limit',
  'skip',
]

const list = ({ baseUrl, apiVersion, apiKey }) => (query={}) => {

  query.apiKey = apiKey
  const queryString = stringifyQuery(query, ALLOWED_KEYS)

  const url = `${baseUrl}/${apiVersion}/charities/?${queryString}`
  const options = {}
  
  return fetchJSON(url, options, query.accessToken)
}

module.exports = list