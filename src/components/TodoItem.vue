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
      this.completed = this.checkAll ? 1 : this.todo.completed
    }
  },
  methods: {
    removeTodo (id) {
      this.$store.dispatch('removeTodo', id)
    },
    editTodo () {
      if (this.completed === 1) {
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
      this.$store.dispatch('doneEdit', {
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
