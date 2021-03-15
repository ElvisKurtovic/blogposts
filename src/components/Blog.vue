<template>
  <div class="Blog justify-content-center">
    <router-link :to="{ name: 'BlogDetailsPage', params: { id: blogs.id } }">
      <div class="card blog">
        <img :src="blogs.creator ? blogs.creator.picture: 'https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg'" class="card-img-top" alt="...">
        <div class="card-body">
          <p class="card-title">
            Title: {{ blogs.title }}
          </p>
          <p>
            Author: {{ blogs.creator ? blogs.creator.email : 'Anonymous' }}
          </p>
        </div>
      </div>
    </router-link>
    <div v-if="blogs.creator">
      <div v-if="blogs.creator.email == state.user.email">
        <button type="button" class="btn btn-outline-danger" @click="deleteBlog">
          Delete Blog
        </button>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import router from '../router'

export default {
  name: 'Blog',
  props: {
    blogs: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      blog: computed(() => AppState.blogs)
    })

    return {
      state,
      async deleteBlog() {
        await blogService.deleteBlog(props.blogs.id)
        router.push({ name: 'Home' })
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
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
