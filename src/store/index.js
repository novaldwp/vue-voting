import { createStore } from 'vuex'
import auth from './modules/auth'
import candidate from './modules/candidate'
import dashboard from './modules/dashboard'
import election from './modules/election'
import user from './modules/user'
import voting from './modules/voting'

const store = createStore({
    modules: {
        auth,
        candidate,
        dashboard,
        election,
        user,
        voting
    }
})

export default store