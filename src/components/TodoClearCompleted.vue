<template>
    <button class="extra__clear" @click="clearCompleted">
        Clear Completed
      </button>
</template>
<script>
export default {
  name: 'todo-clear-completed',
  methods: {
    clearCompleted () {
      var result = confirm('Want to clear?')
      if (result) {
        this.$store.commit('clearCompleted')
      }
    }
  }
}
</script>
