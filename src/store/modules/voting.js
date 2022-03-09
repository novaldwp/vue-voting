import axios from 'axios'

export default {
    namespaced: true,
    state: {
        votings: [],
        totalVoting: 0,
        dataLoading: false
    },
    getters: {
        getAllVotings(state) {
            return state.votings
        },
        getTotalVoting(state) {
            return state.totalVoting
        },
        getDataLoading(state) {
            return state.dataLoading
        }
    },
    mutations: {
        setAllVotings(state, payload) {
            state.votings = payload
        },
        setTotalVoting(state, payload) {
            state.totalVoting = payload
        },
        setDataLoading(state, payload) {
            state.dataLoading = payload
        }
    },
    actions: {
        getAll({ rootState, commit }, payload) {
            commit('setDataLoading', true)

            return new Promise((resolve, reject) => {
                const page  = payload.page
                const limit = payload.limit

                axios.get(`http://api-voting.test/api/v1/votings/paginate?page=${page}&limit=${limit}`)
                .then((res) => {
                    const votings = res.data.data.data
                    const totalVoting = res.data.data.meta.total

                    commit('setAllVotings', votings)
                    commit('setTotalVoting', totalVoting)

                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
                .finally(() => {
                    commit('setDataLoading', false)
                })
            })
        },
        store({ commit }, payload) {
            commit('setDataLoading', true)

            return new Promise((resolve, reject) => {
                const election_id  = payload.election_id
                const candidate_id = payload.candidate_id

                axios.post(`http://api-voting.test/api/v1/votings`, {
                    election_id: election_id,
                    candidate_id: candidate_id
                }).then((res) => {
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                }).finally(() => {
                    commit('setDataLoading', false)
                })
            })
        }
    }
}