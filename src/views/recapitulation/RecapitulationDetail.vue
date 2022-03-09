<script>
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
import { mapActions, mapGetters } from 'vuex'
import { BarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
    components: {
        MoonLoader,
        BarChart
    },
    data() {
        return {
            prevRoute: '',
            election: {},
            dataChart: {
                labels: '',
                datasets: [
                    {
                        label: 'Total Voting',
                        data: '',
                        backgroundColor: ['#6ee69e', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                maintainAspectRatio: false
            }
        }
    },
    computed: {
        prevRoutePath() {
            return this.prevRoute ? this.prevRoute.path : '/elections'
        },
        ...mapGetters({
            getElection: 'election/getElection',
            dataLoading: 'election/getDataLoading'
        })
    },
    methods: {
        ...mapActions({
            getVotingRecapitulation: 'election/getVotingRecapitulation'
        }),
        generateHexColor(length) {
            let hexColors = []

            for (let i = 0; i < length; i++) {
                const hexColor  = '#' + Math.floor(Math.random()*16777215).toString(16);
                hexColors.push(hexColor)
            }

            return hexColors
        }
    },
    created() {
        const election_id = this.$route.params.id

        this.getVotingRecapitulation(election_id).then(() => {
            const dataLength = this.getElection.votingOverview.candidates.length
            const bgColor    = this.generateHexColor(dataLength)
            this.dataChart.labels           = this.getElection.votingOverview.candidates
            this.dataChart.datasets[0].data = this.getElection.votingOverview.totalVoting
            this.dataChart.datasets[0].backgroundColor = bgColor
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
                    name: 'recapitulations.index'
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
            <h1 class="h3 mb-0 text-gray-800">Detail Recapitulation</h1>
                
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link :to="{ name: 'dashboard' }">Home</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link :to="{ name: 'recapitulations.index' }">Recapitulations</router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Detail Recapitulation</li>
                </ol>
            </nav>
        </div>

        <!-- Table -->
        <div class="card shadow">
            <div class="card-header py-3">
                <div class="d-sm-flex align-items-center justify-content-between">
                    <router-link :to="prevRoute" class="d-none d-sm-inline-block">
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
                        <div class="mx-auto mt-3">
                            <router-link :to="{ name: 'elections.detail', params: { id: getElection.id } }">
                                <h2>{{ getElection.name }}</h2>
                            </router-link>
                        </div>
                    </div>
                    <br>
                    <!-- Content Row -->
                    <div class="row">
                        <div class="col-md-12">
                            <BarChart :chartData="dataChart" :options="options" css-classes="chart-container"/>
                        </div>
                    </div>
                    <!-- Content Row -->

                </div>                
            </div>
        </div>
        <!-- end of Table -->

    </div>
    <!-- /.container-fluid -->

</template>
