<template>
<div>
    <label for="checkall">
        <input type="checkbox" id="checkall" :checked="!anyRemaining" @change="allChecked">
        Check all
    </label>
</div>
</template>
<script>
export default {
  name: 'todo-check-all',
  computed: {
    anyRemaining () {
      return this.$store.getters.anyRemaining
    }
  },
  methods: {
    allChecked () {
      this.$store.dispatch('checkAll', event.target.checked)
    }
  }
}
</script>
