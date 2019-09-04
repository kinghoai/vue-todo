<template>
    <div>{{ remaining }} task to do</div>
</template>
<script>
export default {
    name: 'todo-remaining',
    computed: {
        remaining() {
            return this.$store.getters.remaining
        }
    }
}
</script>