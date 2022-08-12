import { createApp } from 'vue/dist/vue.esm-bundler';
//Ругался на сборку через import { createApp } from 'vue/dist/vue.runtime.esm-bundler', пришлось поменять 

import App from './App.vue'

import AppPlugin from './plugins/AppPlagin'

const app = createApp(App)



app.use(AppPlugin)
app.mount('#app')
