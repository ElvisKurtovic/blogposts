<template>
  <!-- <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <img src="https://bcw.blob.core.windows.net/public/img/8600856373152463" alt="CodeWorks Logo">
    <h1 class="my-5 bg-dark text-light p-3 rounded d-flex align-items-center">
      <span class="mx-2 text-white">Vue 3 Starter</span>
    </h1>
  </div> -->

  <div class="container-fluid">
    <div class="col-6 p-1" v-if="state.user.isAuthenticated">
      <form class="form-inline" @submit.prevent="createBlog">
        <div class="form-group">
          <input
            type="text"
            name="title"
            id="title"
            class="form-control"
            placeholder="Title"
            aria-describedby="helpId"
            v-model="state.newBlog.title"
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            name="body"
            id="body"
            class="form-control"
            placeholder="Body"
            aria-describedby="helpId"
            v-model="state.newBlog.body"
          />
        </div>

        <button class="btn btn-info" type="submit">
          Create Blog
        </button>
      </form>
    </div>
    <div class="row justify-space-between" v-if="!blogsData">
      <!-- <div class="col-4"> -->
      <!-- <div class="col-4 p-1" > -->
      <Blog class="col-4" v-for="blogsData in state.blogs" :key="blogsData.id" :blogs="blogsData">
      </blog>
      <!-- </div> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      blogs: computed(() => AppState.blogs),
      newBlog: {},
      activeBlogs: computed(() => AppState.activeBlog),
      active: {}
    })
    onMounted(async() => {
      await blogService.getAllBlog()
    })
    return {
      state,
      async createBlog() {
        // eslint-disable-next-line no-unused-vars
        const blogId = await blogService.createBlog(state.newBlog)
        // router.push({ name: 'BlogDetails', params: { id: blogId } })
        state.newBlog = {}
      },
      async getBlog() {
        await blogService.getBlog(state.blogs.id)
      },
      async deleteBlog() {
        this.getBlog()
        await blogService.deleteBlog(state.activeBlogs.id)
        // router.push({ name: 'Blogs' })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
