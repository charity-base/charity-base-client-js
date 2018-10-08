const { fetchJSON, stringifyQuery } = require('../helpers')

const ALLOWED_KEYS = [
  'apiKey',
  'ids.GB-CHC',
  'search',
  'incomeRange',
  'addressWithin',
  'areasOfOperation.id',
  'causes.id',
  'beneficiaries.id',
  'operations.id',
  'funders',
  'hasGrant',
  'grantDateRange',
  'aggGeoBounds',
  'aggGeoPrecision',
  'aggGrantDateInterval',
  'aggTypes',
]

const agg = ({ baseUrl, apiVersion, apiKey }) => (query={}) => {

  query.apiKey = apiKey
  const queryString = stringifyQuery(query, ALLOWED_KEYS)

  const url = `${baseUrl}/${apiVersion}/aggregate-charities/?${queryString}`
  const options = {}
  
  return fetchJSON(url, options, query.accessToken)
}

module.exports = agg