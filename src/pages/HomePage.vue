<template>
  <!-- <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <img src="https://bcw.blob.core.windows.net/public/img/8600856373152463" alt="CodeWorks Logo">
    <h1 class="my-5 bg-dark text-light p-3 rounded d-flex align-items-center">
      <span class="mx-2 text-white">Vue 3 Starter</span>
    </h1>
  </div> -->

  <div class="container-fluid">
    <div class="row justify-space-between">
      <!-- <div class="col-4"> -->
      <div class="col-4 p-1" v-for="blogsData in state.blogs" :key="blogsData.id" :blogs="blogsData">
        <div class="card">
          <img :src="blogsData.creator ? blogsData.creator.picture: 'https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg'" class="card-img-top" alt="...">
          <div class="card-body">
            <p>
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
      blogs: computed(() => AppState.blogs)
    })
    onMounted(async() => {
      await blogService.getAllBlog()
    })
    return {
      state
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
