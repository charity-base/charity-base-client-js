const config = require('../config')
const semver = require('semver')
const charityClient = require('./charity')
const apiKeyClient = require('./api-key')

const clientOptions = {}

const validate = (version, supportedRanges) => {
  const parsedVersion = semver.valid(version)
  if (!parsedVersion) {
    return null
  }
  const matches = supportedRanges.map(x => semver.satisfies(parsedVersion, x))
  const isValid = matches.indexOf(true) > -1
  return isValid ? parsedVersion : null
}

const getApiVersion = () => {
  return clientOptions.apiVersion
}

const setApiVersion = version => {
  const validVersion = validate(version, config.supportedApiRanges)
  if (!validVersion) {
    const errMessage = `${version} not in supported API versions: ${config.supportedApiRanges.join(', ')}`
    return Promise.reject(new Error(errMessage))
  }
  clientOptions.apiVersion = `v${validVersion}`
  return Promise.resolve(clientOptions.apiVersion)
}

const client = ({ apiKey, baseUrl }) => {
  clientOptions.apiKey = apiKey
  clientOptions.baseUrl = baseUrl || config.baseUrl
  clientOptions.apiVersion = config.defaultApiVersion
  return {
    getApiVersion,
    setApiVersion,
    charity: {
      list: q => charityClient.list(clientOptions)(q),
      count: q => charityClient.count(clientOptions)(q),
      aggregate: q => charityClient.aggregate(clientOptions)(q),
    },
    apiKey: {
      get: q => apiKeyClient.get(clientOptions)(q),
      create: q => apiKeyClient.create(clientOptions)(q),
      remove: q => apiKeyClient.remove(clientOptions)(q),
    }
  }
}

module.exports = client
