import axios from 'axios'
// import qs from 'qs'

export default ({ Vue }) => {
  // create an axios instance
  Vue.prototype.$axios = axios
}
