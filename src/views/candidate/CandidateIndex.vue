
<script>
import Pagination from 'v-pagination-3'
import { mapActions, mapGetters } from 'vuex'
export default {
    components: {
        Pagination
    },
    data() {
        return {
            candidates: [],
            page: 1,
            perPage: 10,
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
            ]
        }
    },
    computed: {
        ...mapGetters({
            getCandidates: 'candidate/getAllCandidates',
            dataLoading: 'candidate/getDataLoading'
        })
    },
    methods: {
        ...mapActions({
            getAllCandidates: 'candidate/getAllCandidates',
            destroyCandidate: 'candidate/destroy'
        }),
        deleteCandidate(candidate_id) {
            this.$swal({
                title: 'Are you sure?',
                text: 'This selected data will be permanently deleted!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            }).then((res) => {
                if (res.isConfirmed) {
                    this.destroyCandidate(candidate_id)

                    this.$swal({
                        title: 'Deleted!',
                        text: 'Selected candidate has been deleted',
                        icon: 'success',
                        timer: 1000,
                        timerProgressBar: true
                    })
                }
            })
            
        },
        getCandidatesByOptions() {
            const pageOptions = {
                page: this.page,
                perPage: this.perPage
            }
            this.getAllCandidates(pageOptions)
        },
    },
    created() {
        const pageOptions = {
            page: this.page,
            perPage: this.perPage
        }

        this.getCandidatesByOptions(pageOptions) // jalanin method
    }
}
</script>
<template>
    <!-- Begin Page Content -->
    <div class="container-fluid">

        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">List Candidates</h1>
        </div>

        <!-- Table -->
        <div class="card shadow">
            <div class="card-header py-3">
        <div class="d-sm-flex align-items-center justify-content-between">
            <router-link :to="{ name: 'candidates.create' }" class="d-none d-sm-inline-block btn btn-sm btn-outline-primary"><i
                    class="fas fa-plus fa-sm text-blue-50"></i> Add New Candidate
            </router-link>
        </div>
            </div>
            <div class="card-body">
                
                <div class="d-sm-flex align-items-center mb-4">
                    <span>Show </span>
                    &nbsp;
                    <select @change="getCandidatesByOptions" v-model="perPage" class="input-sm">
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
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr class="text-center" v-if="dataLoading">
                                <td colspan="6"><i class="fas fa-spinner fa-spin"></i> Loading...</td>
                            </tr>
                            <tr v-else v-for="(candidate, index) in getCandidates" :key="index">
                                <td>{{ candidate.first_name }}</td>
                                <td>{{ candidate.last_name }}</td>
                                <td>{{ candidate.email }}</td>
                                <td>{{ candidate.phone }}</td>
                                <td>
                                    <div class="button-group">
                                        <router-link :to="{ name: 'candidates.edit', params: {id: candidate.id} }" class="btn btn-sm btn-outline-primary mr-3">
                                            Edit
                                        </router-link>
                                        <button class="btn btn-sm btn-outline-danger" @click.prevent="deleteCandidate(candidate.id)">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <pagination v-model="page" :records="this.$store.state.candidate.totalCandidates" :per-page="perPage" @paginate="getCandidatesByOptions"/>
            </div>
        </div>
        <!-- end of Table -->

    </div>
    <!-- /.container-fluid -->

</template>