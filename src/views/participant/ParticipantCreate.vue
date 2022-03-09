<script>
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
import { mapActions } from 'vuex'
export default {
    components: {
        MoonLoader
    },
    data() {
        return {
            participant: {},
            errors: [],
            isClick: false,
            stateLoading: true
        }
    },
    methods: {
        ...mapActions({
            storeParticipant: 'user/store'
        }),
        store() {
            this.isClick = true
            this.participant.role = "voter"

            this.storeParticipant(this.participant).then((res) => {
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
                        name: 'participants.index'
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
            .finally(() => {
                this.isClick = false
            })
        },
    },
    created() {
        setTimeout(() => {
            this.stateLoading = false
        }, 500)
    }
}
</script>
<template>
    <!-- Begin Page Content -->
    <div class="container-fluid">

        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Add New Participant</h1>
                
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link :to="{ name: 'dashboard' }">Home</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link :to="{ name: 'participants.index' }">Participants</router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Add Participant</li>
                </ol>
            </nav>
        </div>

        <!-- Table -->
        <div class="card shadow">
            <div class="card-header py-3">
                <div class="d-sm-flex align-items-center justify-content-between">
                    <router-link :to="{ name: 'participants.index' }" class="d-none d-sm-inline-block btn btn-sm btn-outline-primary"><i
                            class="fas fa-chevron-left fa-sm text-blue-50"></i> Back
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
                    <form @submit.prevent="store">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" v-model="participant.name" placeholder="Enter Name Participant" autofocus>
                            <div v-if="this.errors.name">
                                <small class="form-text text-danger">{{ this.errors.name[0] }}</small>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="text" class="form-control" v-model="participant.email" placeholder="Enter Email Participant">
                            <div v-if="this.errors.email">
                                <small class="form-text text-danger">{{ this.errors.email[0] }}</small>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone</label>
                            <input type="text" class="form-control" v-model="participant.phone" placeholder="Enter Phone Number Participant" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');">
                            <div v-if="this.errors.phone">
                                <small class="form-text text-danger">{{ this.errors.phone[0] }}</small>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" v-model="participant.password" placeholder="Enter Password Participant">
                            <div v-if="this.errors.password">
                                <small class="form-text text-danger">{{ this.errors.password[0] }}</small>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary" :disabled="isClick">
                            <span v-if="isClick"><i class="fas fa-spinner fa-spin"></i> Saving</span>
                            <span v-else>Save</span>
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