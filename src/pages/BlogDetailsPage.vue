<template>
  <div class="blogDetails">
    <form class="form-inline" @submit.prevent="createBlog">
      <div class="form-group">
        <input
          type="text"
          name="title"
          id="title"
          class="form-control"
          placeholder="Title"
          aria-describedby="helpId"
          v-model="state.blog.title"
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
          v-model="state.blog.body"
        />
      </div>

      <button class="btn btn-info" type="submit">
        Create
      </button>
    </form>
    <div class="card blog">
      <button type="button" class="btn btn-outline-danger" @click="deleteBlog">
        Delete Blog
      </button>
      <img :src="state.blog.creator ? state.blog.creator.picture: 'https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg'" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-title">
          Title: {{ state.blog.title }}
        </p>
        <p>
          Author: {{ state.blog.creator ? state.blog.creator.email : 'Anonymous' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
export default {
  name: 'BlogDetailsPage',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      blog: computed(() => AppState.activeBlog)
    })
    onMounted(() => {
      blogService.getBlog(route.params.id)
    })
    onBeforeRouteLeave((to, from, next) => {
      if (window.confirm('You sure bro?')) {
        AppState.activeBlog = {}
        next()
      }
    })
    return {
      route,
      state,
      async createComment() {
        await blogService.createComment({ blog: state.blog.id, body: state.newComment.body })
      },
      async deleteBlog() {
        await blogService.deleteBlog(state.blog.id)
        router.push({ name: 'Home' })
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
