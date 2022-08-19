import api from '../src/api/index'
export default {
    install: (app) => {
        app.prototype.$api = api
    }
}


