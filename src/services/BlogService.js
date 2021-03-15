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

  async getBlog(id) {
    try {
      const res = await api.get('api/blogs/' + id)
      AppState.activeBlog = res.data
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteBlog(id) {
    try {
      await api.delete(`api/blogs/${id}`)
      this.getAllBlog()
    } catch (error) {
      console.error(error)
    }
  }

  async getComments(id) {
    try {
      const res = await api.get(`api/blogs/${id}/comments`)
      AppState.comments = res.data
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  async createComment(rawComment) {
    try {
      const res = await api.post('api/comments', rawComment)
      AppState.comments.push(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteComment(commentId, blogId) {
    try {
      await api.delete('api/comments/' + commentId)
      this.getComments(blogId)
    } catch (error) {
      console.error(error)
    }
  }
}

export const blogService = new BlogService()
