<template>
  <div class="todo">
    <input
      type="text"
      placeholder="What need to be done?"
      class="todo__input"
      @keyup.enter="addTodo"
      v-model="newTodo"
    />
    <div class="todos">
      <!-- Truyền todo & index sang TodoItem qua props -->
      <todo-item  v-for="(todo, index) in todosFiltered" :key="todo.id" :todo="todo" :index="index" :checkAll="!anyRemaining" @removedTodo="removeTodo" @finishedEdit="finishedEdit">
      </todo-item>
    </div>

    <div class="extra">
      <label for="checkall"><input type="checkbox" id="checkall" :checked="!anyRemaining" @change="checkAllTodos">Check all</label>
      <div>{{ remaining }} task to do</div>
    </div>

    <div class="extra">
      <div class="extra__buttons">
        <button v-bind:class="{active: filter == 'all'}" @click="filter = 'all'">All</button>
        <button v-bind:class="{active: filter == 'active'}" @click="filter = 'active'">Active</button>
        <button v-bind:class="{active: filter == 'completed'}" @click="filter = 'completed'">Completed</button>
      </div>
      <div class="extra__clear">
        Clear Completed
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem'
export default {
  name: "todo-list",
  components: {
    TodoItem,
  },
  data() {
    return {
      newTodo: "",
      todoId: 3,
      beforeEditCache: '',
      filter: 'all',
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
      ],
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
      if (this.newTodo.trim().length == 0) {
        return
      }
      var newTodo = {
        id: this.todoId,
        name: this.newTodo,
        completed: false,
        editing: false
      };
      this.todos.push(newTodo);
      this.newTodo = "";
      this.todoId++;
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
        todo.completed = event.target.checked;
      })
    },
    finishedEdit(data) {
      this.todos.splice(data.index, 1, data.todo);
    }
  },
  computed: {
    remaining() {
      return this.todos.filter(todo => todo.completed == false).length;
    },
    anyRemaining() {
      return this.remaining != 0;
    },
    todosFiltered() {
      if(this.filter == 'all') {
        return this.todos;
      } else if(this.filter == 'active') {
        return this.todos.filter(todo => todo.completed == false)
      } else if(this.filter == 'completed') {
        return this.todos.filter(todo => todo.completed == true)
      } else {
        return this.todos;
      }
    },
  },
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
    margin-bottom 15px
    .active {
      background green
      color white
    }
  }
}
</style>
