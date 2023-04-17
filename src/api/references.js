import axios from './axios'

const getReferences = (url) => {
  return axios.get(url).then((response) => response.references)
}

export default {
  getReferences,
}
