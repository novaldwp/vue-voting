<script>
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
    components: {
        MoonLoader
    },
    data() {
        return {
            selectedCandidate: 0,
            messageSelectCandidate: '',
            candidate_id: [],
            candidates: [],
            election: {},
            errors: [],
            isClick: false,
            image: '',
            imagePreview: '',
            stateLoading: true
        }
    },
    methods: {
        ...mapActions({
            getElectionById: 'election/getById'
        }),
    },
    created() {
        const election_id = this.$route.params.id

        this.getElectionById(election_id).then((res) => {
            this.election       = res.data.data
            this.candidates     = res.data.data.candidates
            this.candidate_id   = res.data.data.candidates_id
            this.image          = res.data.data.image
            this.imagePreview   = res.data.data.thumbnail

            this.stateLoading = false
            console.log(this.candidates)
        })
        .catch((err) => {
            const title   = err.response.status
            const message = err.response.statusText

            this.$swal({
                title: title,
                text: `Data ${message}`,
                icon: 'error',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true
            })
            .then(() => {
                this.$router.push({
                    name: 'elections.index'
                })
            })

        })
    },
}
</script>
<template>
    <!-- Begin Page Content -->
    <div class="container-fluid">

        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Detail Election</h1>
        </div>

        <!-- Table -->
        <div class="card shadow">
            <div class="card-header py-3">
                <div class="d-sm-flex align-items-center justify-content-between">
                    <router-link :to="{ name: 'elections.index' }" class="d-none d-sm-inline-block">
                        Back
                    </router-link>
                </div>
            </div>
            <div class="card-body">
                <div v-if="stateLoading">
                    <div class="row col-md-12">
                        <div class="mx-auto" style="margin:15%;">
                            <moon-loader :loading="stateLoading" color="blue"></moon-loader>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="row col-md-12">
                        <div class="mx-auto">
                            <img :src="this.imagePreview" :alt="this.election.name" width="250" height="150">
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <div class="mx-auto mt-3">
                            <h3>{{ this.election.name }}</h3>
                        </div>
                    </div>
                    <hr>
                    <div class="col-md-12">
                        <div class="row">
                            <h4>List Candidates</h4>
                        </div>
                        <div class="row">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th class="text-center">Image</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th class="text-center">Image</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <tr v-for="(candidate, index) in candidates" :key="index">
                                            <td>
                                                <router-link :to="{ name: 'candidates.detail', params:{ id: candidate.id } }">
                                                    {{ candidate.full_name }}
                                                </router-link>
                                            </td>
                                            <td>{{ candidate.email }}</td>
                                            <td>{{ candidate.phone }}</td>
                                            <td class="text-center">
                                                <img :src="candidate.thumbnail" :alt="candidate.first_name" width="80" height="60">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
        <!-- end of Table -->

    </div>
    <!-- /.container-fluid -->

</template>
