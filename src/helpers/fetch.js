const handleFetchErrors = res => {
  if (!res.ok) {
    return res.json()
    .catch(() => {
      throw Error(res.statusText)
    })
    .then(({ message }) => {
      throw Error(message || res.statusText)
    });
  }
  return res
}

const authOptions = (options, accessToken) => {
  if (!accessToken) {
    return options
  }
  return {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  }
}

const fetchJSON = (url, options={}, accessToken) => {
  return fetch(
    url,
    authOptions(options, accessToken),
  )
  .then(handleFetchErrors)
  .then(res => res.json())
}

module.exports = fetchJSON