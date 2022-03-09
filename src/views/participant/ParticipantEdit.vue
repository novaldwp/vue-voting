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
            updateParticipant: 'user/update',
            getParticipantById: 'user/getById'
        }),
        update() {
            this.isClick = true
            const data   = {
                user_id: this.$route.params.id,
                user: this.participant,
            }

            this.updateParticipant(data).then((res) => {
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
                console.log(err)
                const message = err.response.data.message
                
                this.$swal({
                    title: 'Error',
                    text: message,
                    icon: 'error',
                })

                this.errors  = err.response.data.errors
            })
            .finally(() => {
                this.isClick = false
            })
        },
    },
    created() {
        const user_id = this.$route.params.id

        this.getParticipantById(user_id).then((res) => {
            
            this.participant         = res.data.data
            this.stateLoading = false
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
                    name: 'participants.index'
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
            <h1 class="h3 mb-0 text-gray-800">Edit Data Participant</h1>
                
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link :to="{ name: 'dashboard' }">Home</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link :to="{ name: 'participants.index' }">Participants</router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Edit Participant</li>
                </ol>
            </nav>
        </div>

        <!-- Table -->
        <div class="card shadow">
            <div class="card-header py-3">
        <div class="d-sm-flex align-items-center justify-content-between">
            <router-link :to="{ name: 'participants.index' }" class="d-none d-sm-inline-block">
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
                        <button type="submit" class="btn btn-primary" :disabled="isClick">
                            <span v-if="isClick"><i class="fas fa-spinner fa-spin"></i> Updating</span>
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