import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL
const api = axios.create()

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  axios.interceptors.response.use(
    // successful callback, we don't need to do anything
    response => {
      // store.commit('utils/setAxiosState', 0)
      return response
    },

    // check if we received a 404 and redirect
    error => {
      if (error.response.status === 404) {
        // store.commit('utils/setAxiosState', -1)

        router.push('/error/404')
      } else {
        return Promise.reject(error)
      }
    }
  )

  // axios.defaults.withCredentials = true

  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }



// Vue.prototype.$axios = axios
