export const fetchData = (params, action='') => {
  let _baseURL = ''
  if(window.location.host === 'clickio.com' || window.location.host === 'localhost:5000') {
    _baseURL = `https://irr.ru/api/ads/v1/credits/${action}?`;
  } else {
    _baseURL = `https://${window.location.host}/api/ads/v1/credits/${action}?`;
  }

  return fetch(_baseURL + params).then(response => {
    if(response.status === 200) {
      return response.json()
    } else {
      throw `error with status ${response.status}`;
    }
  })
}