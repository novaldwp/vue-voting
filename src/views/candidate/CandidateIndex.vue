
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
            paginationOptions: [
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
                limit: 10,
                type: 0
            }
        }
    },
    computed: {
        ...mapGetters({
            getCandidates: 'candidate/getAllCandidates',
            getTotalCandidates: 'candidate/getTotalCandidates',
            dataLoading: 'candidate/getDataLoading'
        })
    },
    methods: {
        ...mapActions({
            getListCandidates: 'candidate/getListCandidatesByPageAndLimit',
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
            this.getListCandidates(this.byOptions)
        },
        getCandidatesByRows() {
            this.byOptions.page = 1

            this.getListCandidates(this.byOptions)
        }
    },
    created() {
        this.getCandidatesByOptions() // jalanin method
    }
}
</script>
<template>
    <!-- Begin Page Content -->
    <div class="container-fluid">

        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">List Candidates</h1>
                
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'dashboard' }">Home</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Candidates</li>
                    </ol>
                </nav>
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
                    <select @change="getCandidatesByRows" v-model="byOptions.limit" class="input-sm">
                        <option v-for="paginationOption in paginationOptions" :key="paginationOption.value" :value="paginationOption.value">
                            {{ paginationOption.text }}
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
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th class="text-center">#</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr class="text-center" v-if="dataLoading">
                                <td colspan="6" style="padding:10%;"><i class="fas fa-spinner fa-spin"></i> Loading...</td>
                            </tr>
                            <tr class="td align-middle text-center" v-else-if="getTotalCandidates == 0">
                                <td colspan="6" style="padding:10%;">No Data Available.</td>
                            </tr>
                            <tr v-else v-for="(candidate, index) in getCandidates" :key="index">
                                <td class="td align-middle text-center">{{ ((byOptions.page - 1) * byOptions.limit) + index + 1 }}.</td>
                                <td class="td align-middle">
                                    <router-link :to="{ name: 'candidates.detail', params: {id: candidate.id} }">
                                        {{ candidate.full_name }}
                                    </router-link>
                                </td>
                                <td class="td align-middle">{{ candidate.email }}</td>
                                <td class="td align-middle">{{ candidate.phone }}</td>
                                <td class="td align-middle text-center">
                                    <img :src="candidate.thumbnail" :alt="candidate.full_name" width="80" height="60">
                                </td>
                                <td class="td align-middle">
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
                <pagination v-if="!dataLoading" v-model="byOptions.page" :records="getTotalCandidates" :per-page="byOptions.limit" @paginate="getCandidatesByOptions"/>
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