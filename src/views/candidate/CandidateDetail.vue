<script>
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
import { mapActions } from 'vuex'
export default {
    components: {
        MoonLoader
    },
    data() {
        return {
            prevRoute: '',
            elections: [],
            candidate: {},
            errors: [],
            image: '',
            imagePreview: '',
            stateLoading: true
        }
    },
    computed: {
        prevRoutePath() {
            return this.prevRoute ? this.prevRoute.path : '/candidates'
        }
    },
    methods: {
        ...mapActions({
            getCandidateById: 'candidate/getById'
        }),
    },
    created() {
        const candidate_id = this.$route.params.id

        this.getCandidateById(candidate_id).then((res) => {
            this.candidate      = res.data.data
            this.elections      = res.data.data.elections
            this.image          = res.data.data.image
            this.imagePreview   = res.data.data.thumbnail
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
                    name: 'candidates.index'
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
            <h1 class="h3 mb-0 text-gray-800">Detail Candidate</h1>
                
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link :to="{ name: 'dashboard' }">Home</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link :to="{ name: 'candidates.index' }">Candidates</router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Detail Candidate</li>
                </ol>
            </nav>
        </div>

        <!-- Card -->
        <div class="card shadow">
            <div class="card-header py-3">
                <div class="d-sm-flex align-items-center justify-content-between">
                    <router-link :to="prevRoutePath" class="d-none d-sm-inline-block">
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
                    <div class="container">
                        <div class="team-single">
                            <div class="row">
                                <div class="col-lg-4 col-md-5 xs-margin-30px-bottom">
                                    <div class="team-single-img">
                                        <img :src="candidate.image" :alt="candidate.full_name" class="img-main">
                                    </div>
                                </div>

                                <div class="col-lg-8 col-md-7">
                                    <div class="team-single-text padding-50px-left sm-no-padding-left">
                                        <h4 class="font-size38 sm-font-size32 xs-font-size30 mb-3">{{ candidate.full_name }}</h4>
                                        <hr>
                                        <div class="contact-info-section margin-40px-tb">
                                            <ul class="list-style9 no-margin">
                                                <li>
                                                    <div class="row">
                                                        <div class="col-md-5 col-5">
                                                            <strong class="margin-10px-left">Email :</strong>
                                                        </div>
                                                        <div class="col-md-7 col-7">
                                                            <p>{{ candidate.email }}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="row">
                                                        <div class="col-md-5 col-5">
                                                            <strong class="margin-10px-left">Phone Number :</strong>
                                                        </div>
                                                        <div class="col-md-7 col-7">
                                                            <p>{{ candidate.phone }}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="row">
                                                        <div class="col-md-5 col-5">
                                                            <strong class="margin-10px-left">Date of Birth :</strong>
                                                        </div>
                                                        <div class="col-md-7 col-7">
                                                            <p>{{ candidate.dobb }}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="row">
                                                        <div class="col-md-5 col-5">
                                                            <strong class="margin-10px-left">Address :</strong>
                                                        </div>
                                                        <div class="col-md-7 col-7">
                                                            <p>{{ candidate.address }}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="row">
                                                        <div class="col-md-5 col-5">
                                                            <strong class="margin-10px-left xs-margin-four-left">Mission :</strong>
                                                        </div>
                                                        <div class="col-md-7 col-7">
                                                            <p>{{ candidate.mission }}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="row">
                                                        <div class="col-md-5 col-5">
                                                            <strong class="margin-10px-left xs-margin-four-left">Vision :</strong>
                                                        </div>
                                                        <div class="col-md-7 col-7">
                                                            <p>{{ candidate.vision }}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>                                     
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12" v-if='this.$store.state.auth.credential.role == "admin"'>
                    <hr>
                        <div class="row">
                            <h4>List Elections</h4>
                        </div>
                        <div class="row">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th class="text-center">Image</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Name</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th class="text-center">Image</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                            
                                        <template v-if="elections.length != 0">
                                            <tr v-for="(election, index) in elections" :key="index">
                                                <td class="td align-middle">
                                                    <router-link :to="{ name: 'elections.detail', params:{ id: election.id } }">
                                                        {{ election.name }}
                                                    </router-link>
                                                </td>
                                                <td class="td align-middle">{{ election.start_date }}</td>
                                                <td class="td align-middle">{{ election.end_date }}</td>
                                                <td class="td align-middle text-center">
                                                    <img :src="election.thumbnail" :alt="election.name" width="80" height="60">
                                                </td>
                                            </tr>
                                        </template>
                                        <template v-else>
                                            <tr>
                                                <td colspan="4" class="text-center">No Data Available.</td>
                                            </tr>                                                
                                        </template>                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
        <!-- end of Card -->

    </div>
    <!-- /.container-fluid -->

</template>

<style scoped>
body{
    font-size: 16px;
    color: #6f6f6f;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0.8px;
    margin-top:20px;
}
.td .align-middle {
    vertical-align: middle;
}
.font-size38 {
    font-size: 38px;
}
.team-single-text .section-heading h4,
.section-heading h5 {
    font-size: 36px
}
.team-single-text .section-heading.half {
    margin-bottom: 20px
}
@media screen and (max-width: 1199px) {
    .team-single-text .section-heading h4,
    .section-heading h5 {
        font-size: 32px
    }
    .team-single-text .section-heading.half {
        margin-bottom: 15px
    }
}
@media screen and (max-width: 991px) {
    .team-single-text .section-heading h4,
    .section-heading h5 {
        font-size: 28px
    }
    .team-single-text .section-heading.half {
        margin-bottom: 10px
    }
}
@media screen and (max-width: 767px) {
    .team-single-text .section-heading h4,
    .section-heading h5 {
        font-size: 24px
    }
}
.padding-30px-all {
    padding: 30px;
}
.text-center {
    text-align: center!important;
}
img {
    max-width: 100%;
    height: auto;
}
img.img-main {
    width: 400px;
    height: 400px;
}
.list-style9 {
    list-style: none;
    padding: 0
}
.list-style9 li {
    position: relative;
    margin: 0 0 15px 0;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.1)
}
.list-style9 li:last-child {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0
}
</style>