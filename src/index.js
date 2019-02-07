const config = require('../config')
const semver = require('semver')
const charityClient = require('./charity')
const apiKeyClient = require('./api-key')

const validate = (version, supportedRanges) => {
  const parsedVersion = semver.valid(version)
  if (!parsedVersion) {
    return null
  }
  const matches = supportedRanges.map(x => semver.satisfies(parsedVersion, x))
  const isValid = matches.indexOf(true) > -1
  return isValid ? parsedVersion : null
}

class Client {
  constructor({ apiKey, baseUrl }) {
    this.config = {
      apiKey: apiKey,
      baseUrl: baseUrl || config.baseUrl,
      apiVersion: config.defaultApiVersion,
    }
    this.getApiVersion = this.getApiVersion.bind(this)
    this.setApiVersion = this.setApiVersion.bind(this)
  }
  getApiVersion() {
    return this.config.apiVersion
  }
  setApiVersion(version) {
    const validVersion = validate(version, config.supportedApiRanges)
    if (!validVersion) {
      const errMessage = `${version} not in supported API versions: ${config.supportedApiRanges.join(', ')}`
      return Promise.reject(new Error(errMessage))
    }
    this.config.apiVersion = `v${validVersion}`
    return Promise.resolve(this.config.apiVersion)
  }
  get charity() {
    return {
      list: q => charityClient.list(this.config)(q),
      count: q => charityClient.count(this.config)(q),
      aggregate: q => charityClient.aggregate(this.config)(q),
      download: q => charityClient.download(this.config)(q),
    }
  }
  get apiKey() {
    return {
      get: q => apiKeyClient.get(this.config)(q),
      create: q => apiKeyClient.create(this.config)(q),
      remove: q => apiKeyClient.remove(this.config)(q),
    }
  }
}

module.exports = Client
