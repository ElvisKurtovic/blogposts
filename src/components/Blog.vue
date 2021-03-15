<template>
  <div class="Blog">
    <router-link :to="{ name: 'BlogDetailsPage', params: { id: blogs.id } }">
      <div class="card blog">
        <button type="button" class="btn btn-outline-danger" @click="deleteBlog">
          Delete Blog
        </button>
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
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'Blog',
  props: {
    blogs: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user)
    })

    return {
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
