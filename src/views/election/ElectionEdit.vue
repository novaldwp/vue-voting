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
            election: {},
            errors: [],
            isClick: false,
            image: '',
            imagePreview: '',
            stateLoading: true
        }
    },
    computed: {
        ...mapGetters({
            getCandidates: 'candidate/getAllCandidates',
            getDataLoading: 'election/getDataLoading' // TODO => TAMBAH INI KE SEMUA MODUL CREATE/UPDATE
        }),        
    },
    methods: {
        ...mapActions({
            getAllCandidates: 'candidate/getAllCandidates',
            updateElection: 'election/update',
            getElectionById: 'election/getById'
        }),
        update() {
            const candidates = this.candidate_id
            const data = {
                election_id: this.$route.params.id,
                candidate_id: candidates,
                election: this.election,
                image: this.image
            }

            this.updateElection(data).then((res) => {
                const message = res.data.message
                
                this.$swal({
                    title: 'Success',
                    text: message,
                    icon: 'success',
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
            .catch((err) => {
                const message = err.response.data.message
                
                this.$swal({
                    title: 'Error',
                    text: message,
                    icon: 'error',
                })

                this.errors = err.response.data.errors
            })
        },
        onFileSelected(e) {
            let files = e.target.files
            if (!files.length) return;

            if (files[0].size > 2048000)
            {
                this.errors.image = {
                    0: 'Maximum allowed file size is 2 MB.'
                }
            }
            else {
                this.image = files[0]
                this.imagePreview = URL.createObjectURL(files[0]) // create preview using objectURL
            }
        }
    },
    created() {
        this.getAllCandidates()

        const election_id = this.$route.params.id

        this.getElectionById(election_id).then((res) => {
            this.election       = res.data.data
            this.candidate_id   = res.data.data.candidates_id
            this.image          = res.data.data.image
            this.imagePreview   = res.data.data.thumbnail
            this.stateLoading   = false
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
    }
}
</script>
<template>
    <!-- Begin Page Content -->
    <div class="container-fluid">

        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Edit Data Election</h1>
                
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link :to="{ name: 'dashboard' }">Home</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link :to="{ name: 'elections.index' }">Elections</router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Edit Election</li>
                </ol>
            </nav>
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
                <!-- Loader -->
                <div v-if="stateLoading">
                    <div class="row col-md-12">
                        <div class="mx-auto" style="margin:15%;">
                            <moon-loader :loading="stateLoading" color="blue"></moon-loader>
                        </div>
                    </div>
                </div>
                <div v-else>   
                    <form @submit.prevent="update">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" v-model="election.name" placeholder="Enter Name Election">
                            <div v-if="this.errors.name">
                                <small class="form-text text-danger">{{ this.errors.name[0] }}</small>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="start_date">Start Date</label>
                                <input type="date" class="form-control" v-model="election.start_date" placeholder="Enter Start Date" autofocus>
                                <div v-if="this.errors.start_date">
                                    <small class="form-text text-danger">{{ this.errors.start_date[0] }}</small>
                                </div>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="end_date">End Date</label>
                                <input type="date" class="form-control date-picker" v-model="election.end_date" placeholder="Enter End Date">
                                <div v-if="this.errors.end_date">
                                    <small class="form-text text-danger">{{ this.errors.end_date[0] }}</small>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="email">Select Candidates</label>
                            <select class="form-control" v-model="candidate_id" @change="test" multiple required>
                                <option v-for="(candidate, index) in getCandidates" :key="index" :value="candidate.id">
                                    {{ candidate.full_name }}
                                </option>
                            </select>
                            <small class="form-text text-dark">Please select 2 or more candidate from the list above using Ctrl + Left Click.</small>
                            <div v-if="this.errors.email">
                                <small class="form-text text-danger">{{ this.errors.email[0] }}</small>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="phone">Image</label>
                            <div v-if="imagePreview">
                                <img :src="imagePreview" width="200" height="150">
                            </div>
                            <input type="file" class="form-control mt-2" @change="onFileSelected">
                            <div v-if="this.errors.image">
                                <small class="form-text text-danger">{{ this.errors.image[0] }}</small>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary" :disabled="getDataLoading">
                            <span v-if="getDataLoading"><i class="fas fa-spinner fa-spin"></i> Updating</span>
                            <span v-else>Update</span>
                        </button>
                    </form>
                </div>
                <!-- end of Loader -->
            </div>
        </div>
        <!-- end of Table -->

    </div>
    <!-- /.container-fluid -->

</template>