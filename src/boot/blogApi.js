import axios from 'axios'
const blogApi = axios.create({
  baseURL: process.env.VUE_APP_BLOG_API
})
export default ({ app }) => {
  app.blogApi = blogApi
}
export { blogApi }
