<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            selectedCandidate: 0,
            messageSelectCandidate: '',
            candidate_id: [],
            election: {},
            errors: [],
            isClick: false,
            image: '',
            imagePreview: ''
        }
    },
    computed: {
        ...mapGetters({
            getCandidates: 'candidate/getAllCandidates',
        }),        
    },
    methods: {
        ...mapActions({
            getAllCandidates: 'candidate/getAllCandidates',
            storeElection: 'election/store'
        }),
        store() {
            this.isClick = true
            
            const candidates = this.candidate_id
            const data = {
                candidate_id: candidates,
                election: this.election,
                image: this.image
            }

            this.storeElection(data).then((res) => {
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

            this.isClick = false
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
    }
}
</script>
<template>
    <!-- Begin Page Content -->
    <div class="container-fluid">

        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Add New Election</h1>
        </div>

        <!-- Table -->
        <div class="card shadow">
            <div class="card-header py-3">
        <div class="d-sm-flex align-items-center justify-content-between">
            <router-link :to="{ name: 'elections.index' }" class="d-none d-sm-inline-block btn btn-sm btn-outline-primary"><i
                    class="fas fa-chevron-left fa-sm text-blue-50"></i> Back
            </router-link>
        </div>
            </div>
            <div class="card-body">
                <form @submit.prevent="store">
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
                                {{ candidate.first_name }} {{ candidate.last_name }}
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
                    <button type="submit" class="btn btn-primary" :disabled="isClick ? true : false">
                        <span v-if="isClick"><i class="fas fa-spinner fa-spin"></i> Processing...</span>
                        <span v-else>Save</span>
                    </button>
                </form>
            </div>
        </div>
        <!-- end of Table -->

    </div>
    <!-- /.container-fluid -->

</template>