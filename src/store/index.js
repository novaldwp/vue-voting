import { createStore } from 'vuex'
import auth from './modules/auth'
import candidate from './modules/candidate'

const store = createStore({
    modules: {
        auth,
        candidate
    }
})

export default store