<script>
import Topbar from './Topbar.vue'

export default {
    components: {
        Topbar
    }
}
</script>
<template>
        <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-laugh-wink"></i>
                </div>
                <div class="sidebar-brand-text mx-3">E-VOTING</div>
            </a>

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

            <li class="nav-item">
                <router-link :to="{ name: 'candidates.index' }" class="nav-link">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    Candidates
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'elections.index' }" class="nav-link">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    Elections
                </router-link>
            </li>
            
            <!-- Divider -->
            <hr class="sidebar-divider d-none d-md-block">

        </ul>
        <!-- End of Sidebar -->
        
</template>