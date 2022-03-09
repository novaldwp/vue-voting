import axios from "axios"

export default {
    namespaced: true,
    state: {
        candidates: [],
        totalCandidates: 0,
        dataLoading: false
    },
    getters: { // get value state
        getAllCandidates(state) {
            return state.candidates
        },
        getTotalCandidates(state) {
            return state.totalCandidates
        },
        getDataLoading(state) {
            return state.dataLoading
        }
    },
    mutations: { // set value state
        setCandidates(state, payload) {
            state.candidates = payload
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
            commit('setDataLoading', true)

            return new Promise((resolve, reject) => {
                axios.get(
                    'http://api-voting.test/api/v1/candidates'
                ).then((res) => {
                    const candidates = res.data.data
                    
                    commit('setCandidates', candidates)
                    commit('setDataLoading', false)

                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
            })
        },
        getListCandidatesByPageAndLimit({ commit }, payload) {
            commit('setDataLoading', true) // set loading active
            
            return new Promise((resolve, reject) => {
                const page   = payload.page
                const limit  = payload.limit
                axios.get(
                    `http://api-voting.test/api/v1/candidates/paginate?page=${page}&limit=${limit}`,
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
                    reject(err)
                })
            })
        },
        store({ commit }, payload) {
            return new Promise((resolve, reject) => {               
                const data = new FormData()
                data.append('first_name', payload.candidate.first_name)
                data.append('last_name', payload.candidate.last_name)
                data.append('email', payload.candidate.email)
                data.append('phone', payload.candidate.phone)
                data.append('dob', payload.candidate.dob)
                data.append('address', payload.candidate.address)
                data.append('vision', payload.candidate.vision)
                data.append('mission', payload.candidate.mission)
                data.append('image', payload.image)
                axios.post(
                    'http://api-voting.test/api/v1/candidates',
                    data, 
                    {
                        headers: {
                            'Content-Type': "multipart/form-data"
                        }
                    }
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
                const candidate_id = payload
                axios.get(`http://api-voting.test/api/v1/candidates/${candidate_id}`)
                .then((res) => {
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
                const data = new FormData()
                data.append('first_name', payload.candidate.first_name)
                data.append('last_name', payload.candidate.last_name)
                data.append('email', payload.candidate.email)
                data.append('phone', payload.candidate.phone)
                data.append('dob', payload.candidate.dob)
                data.append('address', payload.candidate.address)
                data.append('vision', payload.candidate.vision)
                data.append('mission', payload.candidate.mission)
                data.append('image', payload.image)
                data.append('_method', 'PUT')
                axios.post(
                    `http://api-voting.test/api/v1/candidates/${candidate_id}`,
                    data,
                    {
                        headers: {
                            'Content-Type': "multipart/form-data"
                        }
                    }
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