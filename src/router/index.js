import Vue from 'vue'
import Router from 'vue-router'
import TodoList from '@/components/TodoList'
import About from '@/components/pages/About'
import Home from '@/components/pages/Home'
import Login from '@/components/auth/Login'
import Logout from '@/components/auth/Logout'
import Register from '@/components/auth/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/todo',
      name: 'todo',
      component: TodoList,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {requiresVisitor: true}
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {requiresVisitor: true}
    }
  ]
})
