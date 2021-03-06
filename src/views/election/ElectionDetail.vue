<script>
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
import { mapActions, mapGetters } from 'vuex'
import moment from "moment"
export default {
    components: {
        MoonLoader
    },
    data() {
        return {
            prevRoute: '',
            candidates: [],
            election: {},
            image: '',
            imagePreview: '',
            isRecapitulate: false
        }
    },
    computed: {
        prevRoutePath() {
            return this.prevRoute ? this.prevRoute.path : '/elections'
        },
        ...mapGetters({
            dataLoading: 'election/getDataLoading'
        })
    },
    methods: {
        ...mapActions({
            getElectionById: 'election/getById',
            storeVoting: 'voting/store'
        }),
        vote(candidate_id) {
            const data = {
                election_id: this.$route.params.id,
                candidate_id: candidate_id
            }

            this.$swal({
                title: 'Are you sure?',
                text: 'You will not able to vote again after this',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            }).then((res) => {
                if (res.isConfirmed) {
                    this.storeVoting(data).then((res) => {
                        this.$swal({
                            title: 'Success!',
                            text: 'Successfully vote candidate',
                            icon: 'success',
                            timer: 1000,
                            timerProgressBar: true
                        })
                    })    
                    .catch((err) => {
                        const message = err.response.data.message
                        
                        this.$swal({
                            title: 'Error',
                            text: message,
                            icon: 'error',
                        })
                    })   
                }
            })
        }
    },
    created() {
        const election_id = this.$route.params.id
        let today = new Date()
        today.setHours(0,0,0,0)


        this.getElectionById(election_id).then((res) => {
            this.election       = res.data.data
            this.candidates     = res.data.data.candidates
            this.image          = res.data.data.image
            this.imagePreview   = res.data.data.thumbnail

            if (moment().isSameOrAfter(this.election.start_date)) {
                this.isRecapitulate = true
            }
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
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.prevRoute = from
        })
    }
}
</script>
<template>
    <!-- Begin Page Content -->
    <div class="container-fluid">

        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Detail Election</h1>
                
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link :to="{ name: 'dashboard' }">Home</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link :to="{ name: 'elections.index' }">Elections</router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Detail Election</li>
                </ol>
            </nav>
        </div>

        <!-- Table -->
        <div class="card shadow">
            <div class="card-header py-3">
                <div class="d-sm-flex align-items-center justify-content-between">
                    <router-link :to="prevRoutePath" class="d-none d-sm-inline-block">
                        Back
                    </router-link>
                </div>
            </div>
            <div class="card-body">
                <div v-if="dataLoading">
                    <div class="row col-md-12">
                        <div class="mx-auto" style="margin:15%;">
                            <moon-loader :loading="dataLoading" color="blue"></moon-loader>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="row col-md-12 mb-5">
                        <div class="mx-auto mt-3">
                            <h3>{{ this.election.name }}</h3>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 class="h3 mb-0 text-gray-800" style="margin-left:-1%;">List Candidates</h1>
                            <template v-if="isRecapitulate">
                                <router-link :to="{ name: 'recapitulations.detail', params: { id: election.id } }" class="d-none d-sm-inline-block text-right" style="margin-right:-1%;">
                                    Data Recapitulation
                                </router-link>    
                            </template>
                        </div>
                        <div class="row">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>Vision</th>
                                            <th>Mission</th>
                                            <th class="text-center">Image</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>Vision</th>
                                            <th>Mission</th>
                                            <th class="text-center">Image</th>
                                            <th>Action</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <tr v-for="(candidate, index) in candidates" :key="index">
                                            <td>
                                                <router-link :to="{ name: 'candidates.detail', params:{ id: candidate.id } }">
                                                    {{ candidate.full_name }} 
                                                </router-link>
                                            </td>
                                            <td>{{ candidate.vision }}</td>
                                            <td>{{ candidate.mission }}</td>
                                            <td class="text-center">
                                                <img :src="candidate.thumbnail" :alt="candidate.first_name" width="80" height="60">
                                            </td>
                                            <td class="td align-middle" v-if='this.$store.state.auth.credential.role == "voter"'>
                                                <div class="button-group text-center" v-if="election.votings && Object.keys(election.votings).length > 0">
                                                    <span v-show="candidate.id == election.votings.candidate_id" class="btn btn-sm btn-outline-primary" style="cursor:default;" data-toggle="tooltip" title="You Vote this Candidate">
                                                        <i class="fa fa-check-circle" aria-hidden="true"></i>
                                                    </span>
                                                </div>
                                                <div class="button-group" v-else>
                                                    <button class="btn btn-sm btn-primary" @click.prevent="vote(candidate.id)">Voting</button>
                                                </div>
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
