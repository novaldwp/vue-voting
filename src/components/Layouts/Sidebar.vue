<script>
import Topbar from './Topbar.vue'

export default {
    components: {
        Topbar
    },
}
</script>
<template>
        <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <!-- Sidebar - Brand -->
            <router-link :to="{ name: 'dashboard' }" class="sidebar-brand d-flex align-items-center justify-content-center">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-laugh-wink"></i>
                </div>
                <div class="sidebar-brand-text mx-3">E-VOTING</div>
            </router-link>

            <!-- Divider -->
            <hr class="sidebar-divider my-0">

            <!-- Nav Item - Dashboard -->
            <li class="nav-item">
                <router-link :to="{ name: 'dashboard' }" class="nav-link">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    Dashboard
                </router-link>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider">

            <!-- Heading -->
            <div class="sidebar-heading">
                Main
            </div>
            <li class="nav-item" v-if='this.$store.state.auth.credential.role == "admin"'>
                <router-link :to="{ name: 'candidates.index' }" class="nav-link">
                    <i class="fas fa-fw fa-user-check"></i>
                    Candidates
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'elections.index' }" class="nav-link">
                    <i class="fas fa-fw fa-poll"></i>
                    Elections
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'recapitulations.index' }" class="nav-link" active>
                    <i class="fas fa-fw fa-star"></i>
                    Recapitulations
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'votings.index' }" class="nav-link" active>
                    <i class="fas fa-fw fa-person-booth"></i>
                    Votings
                </router-link>
            </li>
            <li class="nav-item" v-if='this.$store.state.auth.credential.role == "admin"'>
                <router-link :to="{ name: 'participants.index' }" class="nav-link" active>
                    <i class="fas fa-fw fa-users"></i>
                    Participants
                </router-link>
            </li>
            <li class="nav-item" v-if='this.$store.state.auth.credential.role == "admin"'>
                <router-link :to="{ name: 'users.index' }" class="nav-link">
                    <i class="fas fa-fw fa-user"></i>
                    Users
                </router-link>
            </li>
            
            <!-- Divider -->
            <hr class="sidebar-divider d-none d-md-block">

        </ul>
        <!-- End of Sidebar -->
        
</template>