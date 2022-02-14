<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            candidate: {},
            errors: [],
            isClick: false,
            image: '',
            imagePreview: ''
        }
    },
    methods: {
        ...mapActions({
            store: 'candidate/store'
        }),
        storeCandidate() {
            this.isClick = true

            const data = {
                candidate: this.candidate,
                image: this.image
            }
            
            this.store(data).then((res) => {
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
                        name: 'candidates.index'
                    })
                })
            })
            .catch((err) => {
                const message = err.response.data.message
                
                this.$swal({
                    title: 'Error',
                    text: message,
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true
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
                this.errors.image = ''
                this.image = files[0]
                this.imagePreview = URL.createObjectURL(files[0]) // create preview using objectURL
            }
        }
    }
}
</script>
<template>
    <!-- Begin Page Content -->
    <div class="container-fluid">

        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Add New Candidate</h1>
        </div>

        <!-- Table -->
        <div class="card shadow">
            <div class="card-header py-3">
        <div class="d-sm-flex align-items-center justify-content-between">
            <router-link :to="{ name: 'candidates.index' }" class="d-none d-sm-inline-block btn btn-sm btn-outline-primary"><i
                    class="fas fa-chevron-left fa-sm text-blue-50"></i> Back
            </router-link>
        </div>
            </div>
            <div class="card-body">
                <form @submit.prevent="storeCandidate">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="first_name">First Name</label>
                            <input type="text" class="form-control" v-model="candidate.first_name" placeholder="Enter First Name" autofocus>
                            <div v-if="this.errors.first_name">
                                <small class="form-text text-danger">{{ this.errors.first_name[0] }}</small>
                            </div>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="last_name">Last Name</label>
                            <input type="text" class="form-control" v-model="candidate.last_name" placeholder="Enter Last Name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" v-model="candidate.email" placeholder="Enter Email Address (ex. test@test.com)">
                        <div v-if="this.errors.email">
                            <small class="form-text text-danger">{{ this.errors.email[0] }}</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="text" class="form-control" v-model="candidate.phone" placeholder="Enter Phone Number (ex. 08819xxxxx)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');">
                        <div v-if="this.errors.phone">
                            <small class="form-text text-danger">{{ this.errors.phone[0] }}</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="dob">Date of Birth</label>
                        <input type="date" class="form-control" v-model="candidate.dob">
                        <div v-if="this.errors.dob">
                            <small class="form-text text-danger">{{ this.errors.dob[0] }}</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="address">Address</label>
                        <textarea class="form-control" v-model="candidate.address" cols="30" rows="5" placeholder="Enter Address"></textarea>
                        <div v-if="this.errors.address">
                            <small class="form-text text-danger">{{ this.errors.address[0] }}</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="vision">Vision</label>
                        <textarea class="form-control" v-model="candidate.vision" cols="30" rows="5" placeholder="Enter Vision"></textarea>
                        <div v-if="this.errors.vision">
                            <small class="form-text text-danger">{{ this.errors.vision[0] }}</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="mission">Mission</label>
                        <textarea class="form-control" v-model="candidate.mission" cols="30" rows="5" placeholder="Enter Mission"></textarea>
                        <div v-if="this.errors.mission">
                            <small class="form-text text-danger">{{ this.errors.mission[0] }}</small>
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