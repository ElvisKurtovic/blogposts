<template>
  <div class="blogDetails text-center">
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
    <div class="card blog text-center justify-content-center">
      <button type="button" class="btn btn-outline-danger" @click="deleteBlog">
        Delete Blog
      </button>
      <img :src="state.blog.creator ? state.blog.creator.picture: 'https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg'" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-title">
          Title: {{ state.blog.title }}
        </p>
        <p class="card-body">
          Body: {{ state.blog.body }}
        </p>
        <p>
          Author: {{ state.blog.creator ? state.blog.creator.email : 'Anonymous' }}
        </p>
      </div>
      <h5>Comment Section:</h5>
      <Comment v-for="commentData in state.comments" :key="commentData.id" :comment="commentData">
      </comment>
      <form class="form-inline" @submit.prevent="createComment">
        <div class="form-group">
          <input
            type="text"
            name="body"
            id="body"
            class="form-control"
            placeholder="Comment"
            aria-describedby="helpId"
            v-model="state.newComment.body"
          />
        </div>
        <button class="btn btn-info mt-1" type="submit" v-if="state.blog.creator">
          Post Comment
        </button>
      </form>
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
      user: computed(() => AppState.user),
      blog: computed(() => AppState.activeBlog),
      comments: computed(() => AppState.comments),
      newComment: {}
    })
    onMounted(async() => {
      await blogService.getBlog(route.params.id)
      await blogService.getComments(route.params.id)
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
        state.newComment = {}
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
.blog {
  transition: all .2s;
  color: black
}
</style>
