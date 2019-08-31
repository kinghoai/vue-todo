<template>
  <div class="todo">
    {{ newTodo }}
    <input
      type="text"
      placeholder="What need to be done?"
      class="todo__input"
      @keyup.enter="addTodo"
      v-model="newTodo"
    />
    <div class="todos" v-for="(todo, index) in todos" :key="todo.id">
      <div class="todo__item">
        <div class="item__name" @dblclick="editTodo(todo)" v-if="!todo.editing">{{ todo.name }}</div>
        <input class="item__input-name" v-else type="text" v-model="todo.name" @keyup.enter="doneEdit(todo)" @blur="doneEdit(todo)" v-focus @keyup.esc="cancelEdit(todo)">
        <div class="item__remove" @click="removeTodo(index)">&times;</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "todo-list",
  data() {
    return {
      newTodo: "",
      todoId: 3,
      beforeEditCache: '',
      todos: [
        {
          id: 1,
          name: "Quet Nha",
          completed: true,
          editing: false
        },
        {
          id: 2,
          name: "Rua Chen",
          completed: false,
          editing: false
        }
      ]
    };
  },
  directives: {
  focus: {
    // định nghĩa cho directive
    inserted: function (el) {
      el.focus()
    }
  }
},
  methods: {
    addTodo() {
      var newTodo = {
        id: this.todoId,
        name: this.newTodo,
        completed: false
      };
      this.todos.push(newTodo);
      this.newTodo = "";
      this.todoId++;
    },
    editTodo(todo) {
      todo.editing = true;
      this.beforeEditCache = todo.name;
    },
    doneEdit(todo) {
      todo.editing = false;
      todo.name = todo.name;
    },
    cancelEdit(todo) {
      todo.name = this.beforeEditCache;
      todo.editing = false;
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.todo {
  background: #fafafa;
  padding: 15px;

  .todo__input {
    padding: 5px;
    width: 100%;
    font-size: 16px;
    margin-bottom: 20px;
  }

  .todos {
    .todo__item {
      border-bottom 1px solid #cccccc
      padding 5px
      display: flex;
      justify-content: space-between;
    }
    .item__input-name {
      font-size 16px
    }
  }
}
</style>
