<template>
  <div class="todo__item">
    <div class="item__left">
      <input type="checkbox" class="item__checkbox" v-model="completed" />
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
    <div class="item__remove" @click="removeTodo(index)">&times;</div>
  </div>
</template>

<script>
export default {
  name: "todo-item",
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      id: this.todo.id,
      name: this.todo.name,
      completed: this.todo.completed,
      editing: this.todo.editing,
      beforeEditCache: ""
    };
  },
  methods: {
    removeTodo(index) {
      this.$emit("removedTodo", index);
    },
    editTodo() {
      if (this.completed == true) {
        alert("Can't edit task completed");
      } else {
        this.editing = true;
        this.beforeEditCache = this.name;
      }
    },
    doneEdit() {
        if (this.name.trim() == "") {
            this.name = this.beforeEditCache;
        }
        this.editing = false;
        this.$emit("finishedEdit", {
            'index': this.index,
            'todo': {
                'id': this.id,
                'name': this.name,
                'completed': this.completed,
                'editing': this.editing
            }
        });
    },
    cancelEdit() {
        this.name = this.beforeEditCache;
        this.editing = false;
    }
  },
  directives: {
    focus: {
      // định nghĩa cho directive
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>