<template>
  <div class="todo">
      {{ newTodo }}
    <input type="text" placeholder="What need to be done?" class="todo__input" @keyup.enter="addTodo" v-model="newTodo"  />
    <div class="todos" v-for="todo in todos" :key="todo.id">
        {{ todo.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'todo-list',
  data() {
    return {
      newTodo: '',
      todoId: 3,
      todos: [
        {
          id: 1,
          name: 'Quet Nha',
          completed: true
        },
        {
          id: 2,
          name: 'Rua Chen',
          completed: false
        }
      ]
    };
  },
  methods: {
      addTodo() {
        var newTodo = {
            id: this.todoId,
            name: this.newTodo,
            completed: false
        };
        this.todos.push(newTodo);
        this.newTodo = '';
        this.todoId++;
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
  }
}
</style>
