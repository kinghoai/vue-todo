import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
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
    }
})
