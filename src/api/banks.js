import axios from './axios'

const getBanks = (url) => {
  return axios.get(url).then((response) => response.banks)
}

export default {
  getBanks,
}
