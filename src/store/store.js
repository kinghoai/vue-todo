import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://localhost:8069/api'

export const store = new Vuex.Store({
  state: {
    filter: 'all',
    todos: [
      // {
      //   id: 1,
      //   name: 'Quet Nha',
      //   completed: true,
      //   editing: false
      // },
      // {
      //   id: 2,
      //   name: 'Rua Chen',
      //   completed: false,
      //   editing: false
      // }
    ]
  },

  getters: {
    remaining (state) {
      return state.todos.filter(todo => todo.completed === false).length
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
  },
  mutations: {
    retrieveTodos (state, data) {
      state.todos = data
    },
    addTodo (state, todo) {
      state.todos.push({
        id: todo.id,
        name: todo.name,
        completed: false,
        editing: false
      })
    },
    clearCompleted (state) {
      state.todos = state.todos.filter(todo => todo.completed === false)
    },
    checkAll (state) {
      state.todos.forEach((todo) => {
        todo.completed = event.target.checked
      })
    },
    changeFilter (state, filter) {
      state.filter = filter
    },
    removeTodo (state, id) {
      const index = state.todos.findIndex(item => item.id === id)
      state.todos.splice(index, 1)
    },
    doneEdit (state, todo) {
      const index = state.todos.findIndex(item => item.id === todo.id)
      state.todos.splice(index, 1, {
        'id': todo.id,
        'name': todo.name,
        'completed': todo.completed,
        'editing': todo.editing
      })
    }
  },
  actions: {
    retrieveTodos (context) {
      axios.get('/todo')
        .then(response => {
          context.commit('retrieveTodos', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addTodo (context, todo) {
      axios.post('/todo', {
        name: todo.name,
        completed: false
      })
        .then(response => {
          context.commit('addTodo', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    clearCompleted (context) {
      context.commit('clearCompleted')
    },
    checkAll (context) {
      context.commit('checkAll')
    },
    changeFilter (context, filter) {
      context.commit('changeFilter', filter)
    },
    removeTodo (context, id) {
      axios.delete('/todo/' + id)
        .then(response => {
          context.commit('removeTodo', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    doneEdit (context, todo) {
      axios.patch('/todo/' + todo.id, {
        name: todo.name,
        completed: false
      })
        .then(response => {
          context.commit('doneEdit', todo)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})
