
<script>
import Pagination from 'v-pagination-3'
import { mapActions, mapGetters } from 'vuex'
export default {
    components: {
        Pagination
    },
    data() {
        return {
            stateLoading: true,
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
                limit: 10,
                type: 1
            }
        }
    },
    computed: {
        ...mapGetters({
            getUsers: 'user/getAllUsers',
            getTotalUsers: 'user/getTotalUsers',
            dataLoading: 'user/getDataLoading'
        })
    },
    methods: {
        ...mapActions({
            getAllUsers: 'user/getAll',
            destroyUser: 'user/destroy'
        }),
        deleteUser(user_id) {
            this.$swal({
                title: 'Are you sure?',
                text: 'This selected data will be permanently deleted!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            }).then((res) => {
                if (res.isConfirmed) {
                    this.destroyUser(user_id).then(() => {
                        this.getUsersByOptions()
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
        getUsersByOptions() {
            this.getAllUsers(this.byOptions)
        },
        getUsersByRows() {
            this.byOptions.page = 1 // when showing rows selected, back to page 1

            this.getAllUsers(this.byOptions)
        }
    },
    created() {
        this.getUsersByOptions() // jalanin method
    }
}
</script>
<template>
    <!-- Begin Page Content -->
    <div class="container-fluid">

        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">List Users</h1>
                
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link :to="{ name: 'dashboard' }">Home</router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Users</li>
                </ol>
            </nav>
        </div>

        <!-- Table -->
        <div class="card shadow">
            <div class="card-header py-3">
        <div class="d-sm-flex align-items-center justify-content-between">
            <router-link :to="{ name: 'users.create' }" class="d-none d-sm-inline-block btn btn-sm btn-outline-primary"><i
                    class="fas fa-plus fa-sm text-blue-50"></i> Add New User
            </router-link>
        </div>
            </div>
            <div class="card-body">
                
                <div class="d-sm-flex align-items-center mb-4">
                    <span>Show </span>
                    &nbsp;
                    <select @change="getUsersByRows" v-model="byOptions.limit" class="input-sm">
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
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th class="text-center">#</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr class="td align-middle text-center" v-if="dataLoading">
                                <td colspan="6" style="padding:10%;"><i class="fas fa-spinner fa-spin"></i> Loading...</td>
                            </tr>
                            <tr class="td align-middle text-center" v-else-if="getTotalUsers == 0">
                                <td colspan="6" style="padding:10%;">No Data Available.</td>
                            </tr>
                            <tr v-else v-for="(user, index) in getUsers" :key="index">
                                <td class="td align-middle text-center">{{ ((byOptions.page - 1) * byOptions.limit) + index + 1 }}.</td>
                                <td class="td align-middle">{{ user.name }}</td>
                                <td class="td align-middle">{{ user.phone }}</td>
                                <td class="td align-middle">{{ user.email }}</td>
                                <td class="td align-middle">
                                    <div class="button-group">
                                        <router-link :to="{ name: 'users.edit', params: {id: user.id} }" class="btn btn-sm btn-outline-primary mr-3">
                                            Edit
                                        </router-link>
                                        <button class="btn btn-sm btn-outline-danger" @click.prevent="deleteUser(user.id)">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <pagination v-if="!dataLoading" v-model="byOptions.page" :records="getTotalUsers" :per-page="byOptions.limit" @paginate="getUsersByOptions"/>
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