const stringifyQuery = (query, allowedKeys) => {

  const filterKey = k => allowedKeys.indexOf(k) > -1
  const filterValue = v => typeof v !== 'undefined'
  const parseValue = v => v === null ? '' : String(v)

  const queryString = Object.keys(query)
  .filter(filterKey)
  .filter(x => filterValue(query[x]))
  .sort()
  .map(x => `${x}=${parseValue(query[x])}`)
  .join('&')

  return queryString
}

module.exports = stringifyQuery