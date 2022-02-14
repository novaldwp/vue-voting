import axios from "axios"

export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('token') || null,
        credential: {}
    },
    getters: {
        isLoggedIn(state) {
            if (state.token !== null)
            {
                return true
            }
            else {
                return false
            }
        }
    },
    mutations: {
        setToken(state, payload) {
            state.token = payload
        },
        setCredential(state, payload) {
            state.credential = payload
        },
        setLogout(state) {
            state.token = null
        }
    },
    actions: {
        login({ commit }, payload) {
            return new Promise((resolve, reject) => {
                // axios.get('http://api-voting.test/sanctum/csrf-cookie').then(() => {                    
                    axios.post(
                        'http://api-voting.test/api/v1/login',
                        {
                            email: payload.email,
                            password: payload.password
                        }
                    )
                    .then((res) => {
                        const token = 'Bearer ' + res.data.data.token
                        const credential = res.data.data.user

                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = token
                        commit('setToken', token)
                        commit('setCredential', credential)

                        resolve(res)
                    })
                    .catch((err) => {
                        localStorage.removeItem('token')
                        reject(err)
                    })
                // })
            })
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get(
                    'http://api-voting.test/api/v1/logout'
                )
                .then(() => {
                    localStorage.removeItem('token')
                    delete axios.defaults.headers.common['Authorization']
                    commit('setLogout')

                    resolve()
                })
                .catch((err) => {
                    reject(err)
                })

            })
        }
    }
}