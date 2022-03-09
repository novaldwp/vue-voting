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
            errors: [],
            isClick: false,
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
            getElectionById: 'election/getById'
        }),
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
            <h1 class="h3 mb-0 text-gray-800">Voting Election</h1>
                
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link :to="{ name: 'dashboard' }">Home</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link :to="{ name: 'votings.index' }">Votings</router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Voting Election</li>
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
                        <div class="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 class="h3 mb-0 text-gray-800" style="margin-left:-1%;">List Candidates</h1>
                            <template v-if="isRecapitulate">
                                <router-link :to="{ name: 'recapitulations.detail', params: { id: election.id } }" class="d-none d-sm-inline-block text-right btn btn-sm btn-primary shadow-sm" style="margin-right:-1%;">
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
                                                &nbsp;
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
