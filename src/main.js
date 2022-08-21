import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'
import axios from "axios";
// import tasklist from './views/TaskListComponent.vue'
const app = createApp(App);

const store = createStore({
    state() {
        return {
            email: "",
            password: "",
            formData: {  },
            i: 1,
            search: "",
            todoItems: [],
            arrayClone: [],
            created: new Date().toLocaleString(),
            updated: new Date().toLocaleString(),
        }
    },
    mutations: {
        async addTask(state) {
            if (
                state.todoItems.desc !== undefined &&
                state.todoItems.desc.length !== 0 &&
                state.todoItems.title != undefined &&
                state.todoItems.title !== 0
            ) {
                state.todoItems.push({
                    id: state.i,
                    desc: state.todoItems.desc,
                    done: false,
                    title: state.todoItems.title,
                });
                (state.desc = state.todoItems.desc),
                    (state.done = false),
                    (state.title = state.todoItems.title),
                    await axios
                        .post(
                            "http://localhost:3000/todoItems",
                            {
                                id: state.i,
                                desc: state.desc,
                                done: state.done,
                                title: state.title,
                                created: state.created,
                            },
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            }
                        )
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                state.i++;
                state.todoItems.desc = undefined;
                state.todoItems.title = undefined;
                state.arrayClone = state.todoItems;
            }
        },
        filterFalse(state) {
            state.arrayClone = state.todoItems.filter((item) => !item.done);
        },

        filterTrue(state) {
            state.arrayClone = state.todoItems.filter((item) => item.done);
        },

        filterAll(state) {
            state.arrayClone = state.todoItems;
        },

    },
    getters: {
        filterTask(state) {
            if (state.search.length == 0) {
                state.arrayClone = state.todoItems;
            } else {
                state.arrayClone = state.arrayClone.filter(
                    (item) => {
                        return item.desc.toLowerCase().includes(state.search.toLowerCase());
                    }
                );
            }
        },
       
    }

})

app
    .use(router)
    .use(store)
    .mount('#app')

