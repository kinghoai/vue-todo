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
      <todo-item  v-for="(todo, index) in todosFiltered" :key="todo.id" :todo="todo" :index="index" :checkAll="!anyRemaining">
      </todo-item>
    </div>

    <div class="extra">
      <todo-check-all :anyRemaining="anyRemaining"></todo-check-all>
      <todo-remaining :remaining="remaining"></todo-remaining>
    </div>

    <div class="extra">
      <todo-filter></todo-filter>
      <todo-clear-completed></todo-clear-completed>
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem';
import TodoRemaining from './TodoRemaining';
import TodoCheckAll from './TodoCheckAll';
import TodoFilter from './TodoFilter';
import TodoClearCompleted from './TodoClearCompleted';

export default {
  name: "todo-list",
  components: {
    TodoItem,
    TodoRemaining,
    TodoCheckAll,
    TodoFilter,
    TodoClearCompleted
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
  created() {
    eventBus.$on('removedTodo', (index) => this.removeTodo(index));
    eventBus.$on('finishedEdit', (data) => this.finishedEdit(data));
    eventBus.$on('checkAllChanged', () => this.checkAllTodos());
    eventBus.$on('filterChanged', (filter) => this.filter = filter);
    eventBus.$on('doClearCompleted', () => this.clearCompleted());
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
    },
    clearCompleted() {
      var result = confirm("Want to clear?");
      if(result) {
        this.todos = this.todos.filter(todo => todo.completed == false);
      }
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
