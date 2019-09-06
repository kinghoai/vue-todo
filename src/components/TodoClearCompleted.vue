<template>
    <button class="extra__clear" @click="clearCompleted">
        Clear Completed
      </button>
</template>
<script>
export default {
  name: 'todo-clear-completed',
  methods: {
    clearCompleted() {
      eventBus.$emit('doClearCompleted')
    }
  }
}
</script>
