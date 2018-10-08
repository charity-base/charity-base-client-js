const { fetchJSON, stringifyQuery } = require('../helpers')

const ALLOWED_KEYS = [
  'apiKey',
]

const get = ({ baseUrl, apiVersion, apiKey }) => (query={}) => {

  query.apiKey = apiKey
  const queryString = stringifyQuery(query, ALLOWED_KEYS)

  const url = `${baseUrl}/${apiVersion}/api-key/?${queryString}`
  const options = { method: 'GET' }
  
  return fetchJSON(url, options, query.accessToken)
}

module.exports = get