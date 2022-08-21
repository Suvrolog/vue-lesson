import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'
// import tasklist from './views/TaskListComponent.vue'
const app = createApp(App);

const store = createStore({
    state() {
        return {
            i: 1,
            search: "",
            todoItems: [],
            arrayClone: [],
            created: new Date().toLocaleString(),
            updated: new Date().toLocaleString(),
        }
    },
    mutations: {
        increment(state) {
            state.count++
        }
    }
})

app
    .use(router)
    .use(store)
    .mount('#app')

// tasklist
//         .use(store)
//         .mount('.sample')