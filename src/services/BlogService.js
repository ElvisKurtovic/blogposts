import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BlogService {
  async getAllBlog() {
    try {
      const res = await api.get('api/blogs')
      console.log('BLOGS: ', res.data)
      AppState.blogs = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async createBlog(rawBlog) {
    try {
      const res = await api.post('api/blogs', rawBlog)
      AppState.blogs.push(res.data)
      return res.data._id
    } catch (error) {
      console.error(error)
    }
  }
}

export const blogService = new BlogService()
