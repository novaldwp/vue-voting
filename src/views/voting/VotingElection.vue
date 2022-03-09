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
                    <form action="">
                        <div class="col-lg-12">
                            <span><i class="fa fa-exclamation-triangle"></i> Please select one of these Candidates : </span>
                            <div class="container parent mt-3">
                                <div class="row">
                                    <div class='col text-center'>
                                    <input type="radio" name="imgbackground" id="img1" class="d-none imgbgchk" value="">
                                    <label for="img1">
                                        <img src="https://random.imagecdn.app/300/300" alt="Image 1">
                                        <div class="tick_container">
                                        <div class="tick"><i class="fa fa-check"></i></div>
                                        </div>
                                        </label>
                                    </div>
                                    <div class='col text-center'>
                                    <input type="radio" name="imgbackground" id="img2" class="d-none imgbgchk" value="">
                                    <label for="img2">
                                        <img src="https://random.imagecdn.app/300/300" alt="Image 2">
                                        <div class="tick_container">
                                        <div class="tick"><i class="fa fa-check"></i></div>
                                        </div>
                                    </label>
                                    </div>
                                    <div class='col text-center'>
                                    <input type="radio" name="imgbackground" id="img3" class="d-none imgbgchk" value="">
                                    <label for="img3">
                                        <img src="https://random.imagecdn.app/300/300" alt="Image 3">
                                        <div class="tick_container">
                                        <div class="tick"><i class="fa fa-check"></i></div>
                                        </div>
                                    </label>
                                    </div>
                                    <div class='col text-center'>
                                    <input type="radio" name="imgbackground" id="img4" class="d-none imgbgchk" value="">
                                        <label for="img4">
                                        <img src="https://random.imagecdn.app/400/400" alt="Image 4">
                                        <div class="tick_container">
                                            <div class="tick"><i class="fa fa-check"></i></div>
                                        </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                                <button>Confirm</button>
                        </div>
                    </form>
                </div>                
            </div>
        </div>
        <!-- end of Table -->

    </div>
    <!-- /.container-fluid -->

</template>

<style scoped>
html,body{
            min-height: 100vh;
            min-width: 100vw;
        }
        .parent{
            height: 100vh;
        }
        .parent>.row{
            display: flex;
            align-items:stretch;
            height: 100%;
        }
        .col img{
            /* height:100%; */
            width: 100%;
            cursor: pointer;
            transition: transform 1s;
            /* object-fit: cover; */
        }
        .col label{
            overflow: hidden;
            position: relative;
        }
        .imgbgchk:checked + label>.tick_container{
            opacity: 1;
        }
/*         aNIMATION */
        .imgbgchk:checked + label>img{
            transform: scale(1.25);
            opacity: 0.3;
        }
        .tick_container {
            transition: .5s ease;
            opacity: 0;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            cursor: pointer;
            text-align: center;
        }
        .tick {
            background-color: #4CAF50;
            color: white;
            font-size: 16px;
            padding: 6px 12px;
            height: 40px;
            width: 40px;
            border-radius: 100%;
        }
</style>