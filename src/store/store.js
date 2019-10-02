import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://localhost:8069/api'

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
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
    loggedIn (state) {
      return state.token !== null
    },
    remaining (state) {
      return state.todos.filter(todo => todo.completed === 0 || todo.completed === false).length
    },
    anyRemaining (state, getters) {
      return getters.remaining !== 0
    },
    todosFiltered (state) {
      if (state.filter === 'all') {
        return state.todos
      } else if (state.filter === 'active') {
        return state.todos.filter(todo => todo.completed === 0 || todo.completed === false)
      } else if (state.filter === 'completed') {
        return state.todos.filter(todo => todo.completed === 1 || todo.completed === true)
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
        completed: 0,
        editing: false
      })
    },
    clearCompleted (state) {
      state.todos = state.todos.filter(todo => todo.completed === 0 || todo.completed === false)
    },
    checkAll (state, checked) {
      state.todos.forEach((todo) => {
        todo.completed = checked
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
    },
    retrieveToken (state, token, userName, userId) {
      state.token = token
      state.userName = userName
      state.userId = userId
    },
    destroyToken (state) {
      state.token = null
    }
  },
  actions: {
    register (context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/register', {
          name: data.name,
          email: data.email,
          password: data.password
        })
          .then(response => {
            const token = response.data.token
            localStorage.setItem('access_token', token)
            context.commit('retrieveToken', token)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    retrieveToken (context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('/login', {
          username: credentials.username,
          password: credentials.password
        })
          .then(response => {
            const token = response.data.access_token
            localStorage.setItem('access_token', token)
            context.commit('retrieveToken', token)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    destroyToken (context) {
      console.log(context.state.token)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        axios.post('/logout')
          .then(response => {
            localStorage.removeItem('access_token')
            context.commit('destroyToken')
            console.log(response)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            localStorage.removeItem('access_token')
            context.commit('destroyToken')
            reject(error)
          })
      })
    },
    retrieveTodos (context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      axios.get('/todo')
        .then(response => {
          console.log(response)
          context.commit('retrieveTodos', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addTodo (context, todo) {
      if (context.state.token != null) {
        axios.post('/todo', {
          name: todo.name,
          completed: 0,
          user_id: context.state.id
        })
          .then(response => {
            context.commit('addTodo', response.data)
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        router.push({ name: 'login' })
      }
    },
    clearCompleted (context) {
      const completedId = store.state.todos.filter(todo => todo.completed).map(todo => todo.id)
      axios.delete('/todoDeleteCompleted', {
        data: {
          todos: completedId
        }
      })
        .then(response => {
          context.commit('clearCompleted')
        })
        .catch(error => {
          console.log(error)
        })
    },
    checkAll (context, checked) {
      axios.patch('/todoCheckAll', {
        completed: checked
      })
        .then(response => {
          context.commit('checkAll', checked)
        })
        .catch(error => {
          console.log(error)
        })
    },
    changeFilter (context, filter) {
      context.commit('changeFilter', filter)
    },
    removeTodo (context, id) {
      axios.delete('/todo/' + id)
        .then(response => {
          context.commit('removeTodo', id)
        })
        .catch(error => {
          console.log(error)
        })
    },
    doneEdit (context, todo) {
      axios.patch('/todo/' + todo.id, {
        name: todo.name,
        completed: todo.completed
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
