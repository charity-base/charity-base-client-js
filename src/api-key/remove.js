const { fetchJSON, stringifyQuery } = require('../helpers')

const ALLOWED_KEYS = [
  'apiKey',
]

const remove = ({ baseUrl, apiVersion, apiKey }) => (query={}) => {

  query.apiKey = apiKey
  const queryString = stringifyQuery(query, ALLOWED_KEYS)
  const { removeApiKey } = query

  const url = `${baseUrl}/${apiVersion}/api-key/${removeApiKey}/?${queryString}`
  const options = { method: 'DELETE' }
  
  return fetchJSON(url, options, query.accessToken)
}

module.exports = remove