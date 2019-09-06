<template>
    <div class="extra__buttons">
        <button v-bind:class="{active: filter == 'all'}" @click="changeFilter('all')">All</button>
        <button v-bind:class="{active: filter == 'active'}" @click="changeFilter('active')">Active</button>
        <button v-bind:class="{active: filter == 'completed'}" @click="changeFilter('completed')">Completed</button>
      </div>
</template>
<script>
export default {
  name: 'todo-filter',
  data () {
    return {
      filter: 'all',
    }
  },
  methods: {
    changeFilter (filter) {
      this.filter = filter
      eventBus.$emit('filterChanged', filter)
    }
  }
}
</script>
