<template>
  <div class="Comment">
    <br>
    <p>{{ comment.body }}</p>
    <p>Author: {{ comment.creator.email }}</p>
    <button type="button" class="btn btn-outline-danger" @click="deleteComment">
      Delete Comment
    </button>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
export default {
  name: 'Comment',
  props: {
    comment: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state,
      deleteComment() {
        blogService.deleteComment(props.comment.id, props.comment.blog)
        blogService.getComments()
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.comment{
  cursor: pointer
}
</style>
