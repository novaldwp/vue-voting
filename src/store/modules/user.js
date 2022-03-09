import axios from "axios"

export default {
    namespaced: true,
    state: {
        users: [],
        totalUsers: 0,
        dataLoading: false
    },
    getters: {
        getAllUsers(state) {
            return state.users
        },
        getTotalUsers(state) {
            return state.totalUsers
        },
        getDataLoading(state) {
            return state.dataLoading
        }
    },
    mutations: {
        setUsers(state, payload) {
            state.users = payload
        },
        setTotalUsers(state, payload) {
            state.totalUsers = payload
        },
        setDataLoading(state, payload) {
            state.dataLoading = payload
        }
    },
    actions: {
        getAll({ commit }, payload) {
            commit('setDataLoading', true)
            return new Promise((resolve, reject) => {
                const type  = payload.type
                const page  = payload.page
                const limit = payload.limit

                axios.get(
                    `http://api-voting.test/api/v1/users/paginate?page=${page}&limit=${limit}&type=${type}`
                )
                .then((res) => {
                    const users = res.data.data.data
                    const totalUsers = res.data.data.meta.total

                    commit('setUsers', users)
                    commit('setTotalUsers', totalUsers)
                    commit('setDataLoading', false)
                    
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
            })
        },
        store({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios.post(
                    'http://api-voting.test/api/v1/users',
                    payload, 
                ).then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })                
            })
        },
        getById({ commit }, payload) {
            return new Promise((resolve, reject) => {
                const user_id = payload

                axios.get(`http://api-voting.test/api/v1/users/${user_id}`)
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
            })
        },
        update({ commit }, payload) {
            return new Promise((resolve, reject) => {                
                const user_id = payload.user_id
                const data = new FormData()
                data.append('name', payload.user.name)
                data.append('email', payload.user.email)
                data.append('phone', payload.user.phone)
                data.append('_method', "PUT")

                axios.post(
                    `http://api-voting.test/api/v1/users/${user_id}`,
                    data
                ).then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })   
            })
        },
        destroy({ commit }, payload) {
            return new Promise((resolve, reject) => {
                const user_id = payload

                axios.delete(
                    `http://api-voting.test/api/v1/users/${user_id}`
                )
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
            })
        }
    }
}