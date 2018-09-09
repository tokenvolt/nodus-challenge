const api = (url) => {
  return fetch(url)
    .then(response => response.json())
    .then(json => {
      return {
        data: json,
        error: null
      }
    })
    .catch(error => {
      return {
        data: null,
        error
      }
    })
}

export default api
