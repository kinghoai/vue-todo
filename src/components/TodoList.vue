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
      <todo-item  v-for="(todo, index) in todosFiltered" :key="todo.id" :todo="todo" :index="index" :checkAll="!anyRemaining">
      </todo-item>
    </div>

    <div class="extra">
      <todo-check-all></todo-check-all>
      <todo-remaining></todo-remaining>
    </div>

    <div class="extra">
      <todo-filter></todo-filter>
      <todo-clear-completed></todo-clear-completed>
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem'
import TodoRemaining from './TodoRemaining'
import TodoCheckAll from './TodoCheckAll'
import TodoFilter from './TodoFilter'
import TodoClearCompleted from './TodoClearCompleted'

export default {
  name: 'todo-list',
  components: {
    TodoItem,
    TodoRemaining,
    TodoCheckAll,
    TodoFilter,
    TodoClearCompleted
  },
  data () {
    return {
      newTodo: '',
      todoId: 3,
      beforeEditCache: ''
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
    addTodo () {
      if (this.newTodo.trim().length === 0) {
        return
      }
      var newTodo = {
        id: this.todoId,
        name: this.newTodo
      }
      this.$store.dispatch('addTodo', newTodo)

      this.newTodo = ''
      this.todoId++
    }
  },
  computed: {
    remaining () {
      return this.$store.getters.remaining
    },
    anyRemaining () {
      return this.$store.getters.anyRemaining
    },
    todosFiltered () {
      return this.$store.getters.todosFiltered
    }
  }
}
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
