
<script>
import Pagination from 'v-pagination-3'
import { mapActions, mapGetters } from 'vuex'
export default {
    components: {
        Pagination
    },
    data() {
        return {
            elections: [],
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
            colspanLength: 7
        }
    },
    computed: {
        ...mapGetters({
            getElections: 'election/getAllElections',
            getTotalElections: 'election/getTotalElections',
            dataLoading: 'election/getDataLoading'
        })
    },
    methods: {
        ...mapActions({
            getAllElections: 'election/getAll',
            destroyElection: 'election/destroy'
        }),
        deleteElection(election_id) {
            this.$swal({
                title: 'Are you sure?',
                text: 'This selected data will be permanently deleted!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            }).then((res) => {
                if (res.isConfirmed) {
                    this.destroyElection(election_id).then(() => {
                        this.getElectionsByOptions()
                    })

                    this.$swal({
                        title: 'Deleted!',
                        text: 'Selected election has been deleted',
                        icon: 'success',
                        timer: 1000,
                        timerProgressBar: true
                    })
                }
            })            
        },
        getElectionsByOptions() {
            this.getAllElections(this.byOptions)
        },
        getElectionsByRows() {
            this.byOptions.page = 1 // when showing rows selected, back to page 1

            this.getAllElections(this.byOptions)
        }
    },
    created() {
        this.getElectionsByOptions() // jalanin method
        
         if(this.$store.state.auth.credential.role == "voter") {
             this.colspanLength = 6
         }
    }
}
</script>
<template>
    <!-- Begin Page Content -->
    <div class="container-fluid">

        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">List Elections</h1>
                
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link :to="{ name: 'dashboard' }">Home</router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Elections</li>
                </ol>
            </nav>
        </div>

        <!-- Table -->
        <div class="card shadow">
            <div class="card-header py-3" v-if='this.$store.state.auth.credential.role == "admin"'>
                <div class="d-sm-flex align-items-center justify-content-between">
                    <router-link :to="{ name: 'elections.create' }" class="d-none d-sm-inline-block btn btn-sm btn-outline-primary"><i
                            class="fas fa-plus fa-sm text-blue-50"></i> Add New Election
                    </router-link>
                </div>
            </div>
            <div class="card-body">
                
                <div class="d-sm-flex align-items-center mb-4">
                    <span>Show </span>
                    &nbsp;
                    <select @change="getElectionsByRows" v-model="byOptions.limit" class="input-sm">
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
                                <th class="text-center">#</th>
                                <th>Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th class="text-center">Image</th>
                                <th>Status</th>
                                <th v-if='this.$store.state.auth.credential.role == "admin"'>Action</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th class="text-center">#</th>
                                <th>Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th class="text-center">Image</th>
                                <th>Status</th>
                                <th v-if='this.$store.state.auth.credential.role == "admin"'>Action</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr class="td align-middle text-center" v-if="dataLoading">
                                <td :colspan="colspanLength" style="padding:10%;"><i class="fas fa-spinner fa-spin"></i> Loading...</td>
                            </tr>
                            <tr class="td align-middle text-center" v-else-if="getTotalElections == 0">
                                <td :colspan="colspanLength" style="padding:10%;">No Data Available.</td>
                            </tr>
                            <tr v-else v-for="(election, index) in getElections" :key="index">
                                <td class="td align-middle text-center">{{ ((byOptions.page - 1) * byOptions.limit) + index + 1 }}.</td>
                                <td class="td align-middle">
                                    <router-link :to="{ name: 'elections.detail', params: {id: election.id} }">
                                        {{ election.name }}
                                    </router-link>
                                </td>
                                <td class="td align-middle">{{ election.start_datee }}</td>
                                <td class="td align-middle">{{ election.end_datee }}</td>
                                <td class="td align-middle text-center">
                                    <img :src="election.thumbnail" :alt="election.name" width="80" height="60">
                                </td>
                                <td class="td align-middle text-center">
                                    <span v-if='election.status == "upcoming"' class="badge badge-info">Upcoming</span>
                                    <span v-else-if='election.status == "ongoing"' class="badge badge-primary">Ongoing</span>
                                    <span v-else class="badge badge-success">Finish</span>
                                </td>
                                <td class="td align-middle" v-if='this.$store.state.auth.credential.role == "admin"'>
                                    <div class="button-group">
                                        <router-link :to="{ name: 'elections.edit', params: {id: election.id} }" class="btn btn-sm btn-outline-primary mr-3">
                                            Edit
                                        </router-link>
                                        <button class="btn btn-sm btn-outline-danger" @click.prevent="deleteElection(election.id)">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <pagination v-if="!dataLoading" v-model="byOptions.page" :records="getTotalElections" :per-page="byOptions.limit" @paginate="getElectionsByOptions"/>
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