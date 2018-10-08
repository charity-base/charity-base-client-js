const stringifyQuery = (query, allowedKeys) => {
  const queryString = Object.keys(query)
  .filter(x => allowedKeys.indexOf(x) > -1)
  .sort()
  .map(x => `${x}=${String(query[x])}`)
  .join('&')

  return queryString
}

module.exports = stringifyQuery