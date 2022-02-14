import axios from "axios"

export default {
    namespaced: true,
    state: {
        elections: [],
        totalElections: 0,
        dataLoading: false
    },
    getters: {
        getAllElections(state) {
            return state.elections
        },
        getTotalElection(state) {
            return state.totalElections
        },
        getDataLoading(state) {
            return state.dataLoading
        }
    },
    mutations: {
        setElections(state, payload) {
            state.elections = payload
        },
        setTotalElections(state, payload) {
            state.totalElections = payload
        },
        setDataLoading(state, payload) {
            state.dataLoading = payload
        }
    },
    actions: {
        getAll({ commit }, payload) {
            commit('setDataLoading', true)
            
            return new Promise((resolve, reject) => {
                const page = payload.page
                const limit = payload.limit

                axios.get(
                    `http://api-voting.test/api/v1/elections/paginate?page=${page}&limit=${limit}`
                )
                .then((res) => {
                    const elections = res.data.data.data
                    const totalElections = res.data.data.meta.total

                    commit('setElections', elections)
                    commit('setTotalElections', totalElections)
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
                data.append('name', payload.election.name)
                data.append('start_date', payload.election.start_date)
                data.append('end_date', payload.election.end_date)
                data.append('image', payload.image)
                data.append('candidate_id', payload.candidate_id)

                axios.post(
                    'http://api-voting.test/api/v1/elections',
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
                const election_id = payload

                axios.get(`http://api-voting.test/api/v1/elections/${election_id}`)
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
                const data        = new FormData()
                const election_id = payload.election_id
                data.append('name', payload.election.name)
                data.append('start_date', payload.election.start_date)
                data.append('end_date', payload.election.end_date)
                data.append('image', payload.image)
                data.append('candidate_id', payload.candidate_id)
                data.append('_method', 'PUT')
                console.log(payload)
                axios.post(
                    `http://api-voting.test/api/v1/elections/${election_id}`,
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
        destroy({ commit }, payload) {
            commit('setDataLoading', true)

            return new Promise((resolve, reject) => {
                const election_id = payload

                axios.delete(
                    `http://api-voting.test/api/v1/elections/${election_id}`
                )
                .then((res) => {
                    commit('setDataLoading', false)
                    
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
            })
        }
    }
}