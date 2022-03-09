<script>
import { mapActions, mapGetters } from 'vuex'
import Vue3Autocounter from 'vue3-autocounter'
import { BarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
    components: {
        Vue3Autocounter,
        BarChart
    },
    setup() {
    },
    data() {
        return {
            setClass: '',
            counterStart: 0,
            counterDuration: 1,
            dataChart: {
                labels: '',
                datasets: [
                    {
                        label: 'Total Participant',
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
        ...mapGetters({
            getDashboard: 'dashboard/getDashboard',
            dataLoading: 'dashboard/getDataLoading'
        })
    },
    methods: {
        ...mapActions({
            getDataDashboard: 'dashboard/getData'
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
        const role = this.$store.state.auth.credential.role 
        if (role == "voter") {
            this.setClass = "col-xl-3 col-md-6 mb-4"
        }
        else {
            this.setClass = "col-xl-4 col-md-6 mb-4"
        }

        this.getDataDashboard().then(() => {
            const dataLength = this.getDashboard.electionOverview.labels.length
            const bgColor    = this.generateHexColor(dataLength)
            this.dataChart.labels           = this.getDashboard.electionOverview.labels
            this.dataChart.datasets[0].data = this.getDashboard.electionOverview.data
            this.dataChart.datasets[0].backgroundColor = bgColor
        })
    },
}
</script>

<template>
    <!-- Begin Page Content -->
    <div class="container-fluid">

        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
        </div>

        <!-- Content Row -->
        <div class="row">

            <!-- Upcoming Elections Card -->
            <div :class="setClass">
                <div class="card border-left-danger border-bottom-danger shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    Upcoming Elections</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">
                                    <span v-if="dataLoading">
                                        <i class="fas fa-spinner fa-spin"></i></span>
                                    <span v-else>
                                        <vue3-autocounter ref='counter' :startAmount='counterStart' :endAmount='getDashboard.upcomingElections' :duration='counterDuration' separator='.' />
                                    </span>
                                </div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-poll fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Ongoing Elections Card -->
            <div :class="setClass">
                <div class="card border-left-primary border-bottom-primary shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    Ongoing Elections</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">
                                    <span v-if="dataLoading">
                                        <i class="fas fa-spinner fa-spin"></i></span>
                                    <span v-else>
                                        <vue3-autocounter ref='counter' :startAmount='counterStart' :endAmount='getDashboard.ongoingElections' :duration='counterDuration' separator='.' />
                                    </span>
                                </div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-poll fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Finish Elections Card -->
            <div :class="setClass">
                <div class="card border-left-success border-bottom-success shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    Finish Elections</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">
                                    <span v-if="dataLoading">
                                        <i class="fas fa-spinner fa-spin"></i></span>
                                    <span v-else>
                                        <vue3-autocounter ref='counter' :startAmount='counterStart' :endAmount='getDashboard.finishElections' :duration='counterDuration' separator='.' />
                                    </span>
                                </div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-poll fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Total Elections Card -->
            <div :class="setClass">
                <div class="card border-left-dark border-bottom-dark shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                    Total Elections</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">
                                    <span v-if="dataLoading">
                                        <i class="fas fa-spinner fa-spin"></i></span>
                                    <span v-else>
                                        <vue3-autocounter ref='counter' :startAmount='counterStart' :endAmount='getDashboard.totalElections' :duration='counterDuration' separator='.' />
                                    </span>
                                </div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-vote-yea fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Total Candidates Card -->
            <div :class="setClass" v-show='this.$store.state.auth.credential.role == "admin"'>
                <div class="card border-left-info border-bottom-info shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                    Total Candidates</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">
                                    <span v-if="dataLoading">
                                        <i class="fas fa-spinner fa-spin"></i></span>
                                    <span v-else>
                                        <vue3-autocounter ref='counter' :startAmount='counterStart' :endAmount='getDashboard.totalCandidates' :duration='counterDuration' separator='.' />
                                    </span>
                                </div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-user fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Total Participants Card -->
            <div :class="setClass" v-show='this.$store.state.auth.credential.role == "admin"'>
                <div class="card border-left-warning border-bottom-warning shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                    Total Participants</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">
                                    <span v-if="dataLoading">
                                        <i class="fas fa-spinner fa-spin"></i></span>
                                    <span v-else>
                                        <vue3-autocounter ref='counter' :startAmount='counterStart' :endAmount='getDashboard.totalParticipants' :duration='counterDuration' separator='.' />
                                    </span>
                                </div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-users fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <!-- Content Row -->
        
        <!-- Content Row -->
        <div class="row" v-show='this.$store.state.auth.credential.role == "admin"'>
            <div class="col-md-12">
                <div class="card shadow mb-4">
                    <!-- Chart Card -->
                    <div
                        class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Elections Overview</h6>
                    </div>
                    <!-- Card Body -->
                    <div class="card-body">
                        <BarChart :chartData="dataChart" :options="options" css-classes="chart-container"/>
                    </div>
                </div>
            </div>
        </div>
        <!-- Content Row -->

        <!-- Content Row -->
        <div class="row" v-show='this.$store.state.auth.credential.role == "voter"'>

            <div class="col-md-12">
                <!-- How to Voting -->
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">How to Take Part in Election Voting?</h6>
                    </div>
                    <div class="card-body">
                        <p>
                            Here's How You Can Participate in Election Voting :
                        </p>
                        <ol>
                            <li>Go to Elections on Menu.</li>
                            <li>Choose one of many ongoing Elections.</li>
                            <li>You will be shown with a list of candidates along with the candidate's information.</li>
                            <li>Then click the <b>Voting</b> button in the row according to the name of the candidate you select.</li>
                            <li>Finish. To view the data recapitulation of the election vote, you can press the <b>Data Recapitulation</b> button.</li>
                        </ol>
                    </div>
                </div>
            </div>

        </div>
        <!-- Content Row -->
    </div>
    <!-- /.container-fluid -->
</template>