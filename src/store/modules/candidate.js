import axios from "axios"

export default {
    namespaced: true,
    state: {
        candidates: [],
        candidate: {},
        totalCandidates: 0,
        dataLoading: false
    },
    getters: { // get value state
        getAllCandidates(state) {
            return state.candidates
        },
        getDataLoading(state) {
            return state.dataLoading
        }
    },
    mutations: { // set value state
        setCandidates(state, payload) {
            state.candidates = payload
        },
        setCandidate(state, payload) {
            state.candidate = payload
        },
        setTotalCandidates(state, payload) {
            state.totalCandidates = payload
        },
        deleteCandidate(state, payload) {
            const index = state.candidates.findIndex(candidate => candidate.id === payload)
            state.candidates.splice(index, 1)
        },
        setDataLoading(state, payload) {
            state.dataLoading = payload
        }
    },
    actions: {
        getAllCandidates({ commit }, payload) {
            commit('setDataLoading', true) // set loading active
            
            return new Promise((resolve, reject) => {
                const page      = payload.page
                const perPage   = payload.perPage
                axios.get(
                    `http://api-voting.test/api/v1/candidates?page=${page}&per_page=${perPage}`,
                )
                .then((res) => {
                    const candidates = res.data.data.data
                    const totalCandidates = res.data.data.meta.total

                    commit('setCandidates', candidates)
                    commit('setTotalCandidates', totalCandidates)
                    commit('setDataLoading', false)
                    resolve(res)
                })
                .catch((err) => {
                    reject(err.response)
                    console.log(err.response)
                })
            })
        },
        store({ commit }, payload) {
            commit('setDataLoading', true)
            return new Promise((resolve, reject) => {               
                axios.post(
                    'http://api-voting.test/api/v1/candidates',
                    payload,
                ).then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
            })
        },
        edit({ commit }, payload) {
            return new Promise((resolve, reject) => {
                const candidate_id = payload
                axios.get(`http://api-voting.test/api/v1/candidates/${candidate_id}`)
                .then((res) => {
                    commit('setCandidate', res.data.data)

                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
            })
        },
        destroy({ commit }, payload) {
            commit('setDataLoading', true) // set loading active

            return new Promise((resolve, reject) => {
                axios.delete(`http://api-voting.test/api/v1/candidates/${payload}`)
                .then((res) => {
                    commit('deleteCandidate', payload)
                    commit('setDataLoading', false)

                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
            })
        },
        update({ commit }, payload) {
            return new Promise((resolve, reject) => {
                const candidate_id = payload.candidate_id
                const data = payload.candidate
                axios.put(
                    `http://api-voting.test/api/v1/candidates/${candidate_id}`,
                    data
                ).then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
            })
        },
    }
}