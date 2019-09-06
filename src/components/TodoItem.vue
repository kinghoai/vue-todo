<template>
  <div class="todo__item">
    <div class="item__left">
      <input type="checkbox" class="item__checkbox" v-model="completed" @change="doneEdit" />
      <div class="item__name" @dblclick="editTodo" v-if="!editing">{{ name }}</div>
      <input
        class="item__input-name"
        v-else
        type="text"
        v-model="name"
        @keyup.enter="doneEdit"
        @blur="doneEdit"
        v-focus
        @keyup.esc="cancelEdit"
      />
    </div>
    <div class="item__remove" @click="removeTodo(id)">&times;</div>
  </div>
</template>

<script>
export default {
  name: 'todo-item',
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      id: this.todo.id,
      name: this.todo.name,
      completed: this.todo.completed,
      editing: this.todo.editing,
      beforeEditCache: ''
    };
  },
  watch: {
    checkAll () {
      // if(this.checkAll) {
      //     this.completed = true;
      // } else {
      //     this.completed = this.todo.completed;
      // }
      this.completed = this.checkAll ? true : this.todo.completed;
    }
  },
  methods: {
    removeTodo (id) {
      const index = this.$store.state.todos.findIndex(item => item.id === id)
      this.$store.state.todos.splice(index, 1)
    },
    editTodo () {
      if (this.completed === true) {
        alert("Can't edit task completed")
      } else {
        this.editing = true
        this.beforeEditCache = this.name
      }
    },
    doneEdit () {
      if (this.name.trim() === '') {
        this.name = this.beforeEditCache
      }
      this.editing = false
      const index = this.$store.state.todos.findIndex(item => item.id === this.id)
      this.$store.state.todos.splice(index, 1, {
        'id': this.id,
        'name': this.name,
        'completed': this.completed,
        'editing': this.editing
      })
    },
    cancelEdit () {
      this.name = this.beforeEditCache
      this.editing = false
    }
  },
  directives: {
    focus: {
      // định nghĩa cho directive
      inserted: function (el) {
        el.focus();
      }
    }
  }
}
</script>
