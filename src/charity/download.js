const { fetchBlob, stringifyQuery } = require('../helpers')

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
  'funders',
  'hasGrant',
  'grantDateRange',
  'sort',
]

const download = ({ baseUrl, apiVersion, apiKey }) => (query={}) => {

  query.apiKey = apiKey
  const queryString = stringifyQuery(query, ALLOWED_KEYS)
  const { fileType, accessToken } = query

  const url = `${baseUrl}/${apiVersion}/download-charities/?${queryString}`
  const options = {
    method: 'POST',
    body: JSON.stringify({ fileType }),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  }
  
  return fetchBlob(url, options, accessToken)
}

module.exports = download