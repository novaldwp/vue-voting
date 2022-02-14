import { createStore } from 'vuex'
import auth from './modules/auth'
import candidate from './modules/candidate'
import election from './modules/election'

const store = createStore({
    modules: {
        auth,
        candidate,
        election
    }
})

export default store