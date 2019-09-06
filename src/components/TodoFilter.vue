<template>
    <div class="extra__buttons">
        <button v-bind:class="{active: $store.state.filter == 'all'}" @click="changeFilter('all')">All</button>
        <button v-bind:class="{active: $store.state.filter == 'active'}" @click="changeFilter('active')">Active</button>
        <button v-bind:class="{active: $store.state.filter == 'completed'}" @click="changeFilter('completed')">Completed</button>
      </div>
</template>
<script>
export default {
  name: 'todo-filter',
  data () {
    return {
      filter: 'all'
    }
  },
  methods: {
    changeFilter (filter) {
      this.$store.state.filter = filter
    }
  }
}
</script>
