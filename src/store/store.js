import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    filter: 'all',
    todos: [
      {
        id: 1,
        name: 'Quet Nha',
        completed: true,
        editing: false
      },
      {
        id: 2,
        name: 'Rua Chen',
        completed: false,
        editing: false
      }
    ]
  },
  getters: {
    remaining (state) {
      return state.todos.filter(todo => todo.completed == false).length
    },
    anyRemaining (state, getters) {
      return getters.remaining !== 0
    },
    todosFiltered (state) {
      if (state.filter === 'all') {
        return state.todos
      } else if (state.filter === 'active') {
        return state.todos.filter(todo => todo.completed === false)
      } else if (state.filter === 'completed') {
        return state.todos.filter(todo => todo.completed === true)
      } else {
        return state.todos
      }
    }
  }
})
