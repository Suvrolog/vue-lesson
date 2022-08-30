import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

// import Paginate from "vuejs-paginate-next";


const app = createApp(App);




app
    .use(router)
    // .use(Paginate)
    .use(store)
    .mount('#app')

