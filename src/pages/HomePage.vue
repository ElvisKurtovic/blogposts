<template>
  <!-- <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <img src="https://bcw.blob.core.windows.net/public/img/8600856373152463" alt="CodeWorks Logo">
    <h1 class="my-5 bg-dark text-light p-3 rounded d-flex align-items-center">
      <span class="mx-2 text-white">Vue 3 Starter</span>
    </h1>
  </div> -->

  <div class="container-fluid">
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
        Create
      </button>
    </form>
    <div class="row justify-space-between">
      <!-- <div class="col-4"> -->
      <div class="col-4 p-1" v-for="blogsData in state.blogs" :key="blogsData.id" :blogs="blogsData">
        <div class="card blog">
          <img :src="blogsData.creator ? blogsData.creator.picture: 'https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg'" class="card-img-top" alt="...">
          <div class="card-body">
            <p class="card-title">
              Title: {{ blogsData.title }}
            </p>
            <p>
              Author: {{ blogsData.creator ? blogsData.creator.email : 'Anonymous' }}
            </p>
          </div>
        </div>
      </div>
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
      blogs: computed(() => AppState.blogs),
      newBlog: {}
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

.blog:hover {
  transform: translateY(-5px);
  box-shadow: 1px 3px 5px rgb(94, 94, 94);
  cursor: pointer
}
.blog {
  transition: all .2s;
  color: black
}
</style>
