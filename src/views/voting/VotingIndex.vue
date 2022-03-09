
<script>
import Pagination from 'v-pagination-3'
import { mapActions, mapGetters } from 'vuex'
export default {
    components: {
        Pagination
    },
    data() {
        return {
            votings: [],
            perPageOptions: [
                {
                    text: '10', value: 10
                },
                {
                    text: '25', value: 25
                },
                {
                    text: '50', value: 50
                }
            ],
            byOptions: {
                page: 1,
                limit: 10
            },
            colspanLength: 5
        }
    },
    computed: {
        ...mapGetters({
            getVotings: 'voting/getAllVotings',
            getTotalVoting: 'voting/getTotalVoting',
            dataLoading: 'voting/getDataLoading'
        })
    },
    methods: {
        ...mapActions({
            getAllVotings: 'voting/getAll',
        }),
        getVotingsByOptions() {
            this.getAllVotings(this.byOptions)
        },
        getVotingsByRows() {
            this.byOptions.page = 1 // when showing rows selected, back to page 1

            this.getAllVotings(this.byOptions)
        }
    },
    created() {
        this.getVotingsByOptions() // jalanin method
        
        if(this.$store.state.auth.credential.role == "voter") {
            this.colspanLength = 4
        }
    }
}
</script>
<template>
    <!-- Begin Page Content -->
    <div class="container-fluid">

        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between">
            <h1 class="h3 mb-0 text-gray-800">Votings</h1>
                
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link :to="{ name: 'dashboard' }">Home</router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Votings</li>
                </ol>
            </nav>
        </div>

        <!-- Table -->
        <div class="card shadow">
            <div class="card-header py-3">
                <div class="d-sm-flex align-items-center justify-content-between">
                    Voting History
                </div>
            </div>
            <div class="card-body">
                
                <div class="d-sm-flex align-items-center mb-4">
                    <span>Show </span>
                    &nbsp;
                    <select @change="getVotingsByRows" v-model="byOptions.limit" class="input-sm">
                        <option v-for="perPageOption in perPageOptions" :key="perPageOption.value" :value="perPageOption.value">
                            {{ perPageOption.text }}
                        </option>
                    </select>
                    &nbsp;
                    <span>Rows</span>
                </div>  
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th class="text-center" width="5%">#</th>
                                <th v-if='this.$store.state.auth.credential.role == "admin"' >Participant Name</th>
                                <th>Election Name</th>
                                <th>Vote</th>
                                <th>Date Time</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th class="text-center" width="5%">#</th>
                                <th v-if='this.$store.state.auth.credential.role == "admin"'>Participant Name</th>
                                <th>Election Name</th>
                                <th>Vote</th>
                                <th>Date Time</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr class="td align-middle text-center" v-if="dataLoading">
                                <td :colspan="colspanLength" style="padding:10%;"><i class="fas fa-spinner fa-spin"></i> Loading...</td>
                            </tr>
                            <tr class="td align-middle text-center" v-else-if="getTotalVoting == 0">
                                <td :colspan="colspanLength" style="padding:10%;">No Data Available.</td>
                            </tr>
                            <tr v-else v-for="(voting, index) in getVotings" :key="index">
                                <td class="td align-middle text-center">{{ ((byOptions.page - 1) * byOptions.limit) + index + 1 }}.</td>
                                <td v-if='this.$store.state.auth.credential.role == "admin"' class="td align-middle">{{ voting.users.name }}</td>
                                <td class="td align-middle">
                                    <router-link :to="{ name: 'elections.detail', params: {id: voting.elections.id} }">
                                        {{ voting.elections.name }}
                                    </router-link>
                                </td>
                                <td class="td align-middle">{{ voting.candidates.first_name }} {{ voting.candidates.first_name }}</td>
                                <td class="td align-middle">{{ voting.created_att }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <pagination v-if="!dataLoading" v-model="byOptions.page" :records="getTotalVoting" :per-page="byOptions.limit" @paginate="getVotingsByOptions" :options="{theme:'bootstrap4'}"/>
            </div>
        </div>
        <!-- end of Table -->

    </div>
    <!-- /.container-fluid -->

</template>

<style scoped>
.td .align-middle {
    vertical-align: middle;
}
</style>