import axios from "axios"

export default {
    namespaced: "true",
    state: {
        dashboard: {},
        dataLoading: false
    },
    getters: {
        getDashboard(state) {
            return state.dashboard
        },
        getDataLoading(state) {
            return state.dataLoading
        }
    },
    mutations: {
        setDataDashboard(state, payload) {
            state.dashboard = payload
        },
        setDataLoading(state, payload) {
            state.dataLoading = payload
        }
    },
    actions: {
        getData({ commit }, payload) {
            return new Promise((resolve, reject) => {
                commit('setDataLoading', true)

                axios.get('http://api-voting.test/api/v1/dashboard').then((res) => {
                    const data = res.data.data
                    commit('setDataDashboard', data)

                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
                .finally(() => {
                    commit('setDataLoading', false)
                })
            })
        }
    }
}