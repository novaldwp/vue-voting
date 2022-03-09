import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import axios from 'axios'
import VueSweetAlert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

axios.defaults.headers.common['Authorization'] = store.state.auth.token
axios.defaults.withCredentials = true

createApp(App)
    .use(router)
    .use(store)
    .use(VueSweetAlert2)
    .mount('#app')
