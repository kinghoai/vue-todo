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
    <div class="todos">
      <div class="todo__item"  v-for="(todo, index) in todos" :key="todo.id">
        <div class="item__left">
          <input type="checkbox" class="item__checkbox" v-model="todo.completed">
          <div class="item__name" @dblclick="editTodo(todo)" v-if="!todo.editing">{{ todo.name }}</div>          
          <input class="item__input-name" v-else type="text" v-model="todo.name" @keyup.enter="doneEdit(todo)" @blur="doneEdit(todo)" v-focus @keyup.esc="cancelEdit(todo)">
        </div>
        <div class="item__remove" @click="removeTodo(index)">&times;</div>
      </div>
    </div>

    <div class="extra">
      <label for="checkall"><input type="checkbox" id="checkall" :checked="!anyRemaining" @change="checkAllTodos">Check all</label>
      <div>{{ remaining }} item left</div>
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
  computed: {
    remaining() {
      return this.todos.filter(todo => todo.completed == false).length;
    },
    anyRemaining() {
      return this.remaining != 0;
    }
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
    },
    checkAllTodos() {
      this.todos.forEach((todo)=>{
        console.log(event);
        todo.completed = event.target.checked;
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.todo {
  background: #fafafa;
  padding: 25px;

  .todo__input {
    padding: 5px;
    width: 100%;
    font-size: 16px;
    margin-bottom: 20px;
  }
  input[type='checkbox'] {
    margin-right 20px
  }
  .todos {
    margin-bottom 30px
    .todo__item {
      border-bottom 1px solid #cccccc
      padding 5px
      display: flex;
      justify-content: space-between;
      .item__left {
        display flex
        align-items center
      }
      .item__input-name {
      font-size 16px
      }
      .item__checkbox:checked + .item__name {
        text-decoration line-through
        color #888585
      }
    }
  }
  .extra {
    font-size 12px
    display: flex
    justify-content space-between
  }
}
</style>
