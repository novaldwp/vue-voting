<template>
<div id="wrapper">

    <Sidebar/>
        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <Topbar/>
                <!-- {{ this.$store.auth.state.credential }} -->
                <router-view></router-view>
                
            </div>
            <!-- End of Main Content -->
            
            <Footer/>

        </div>
        <!-- End of Content Wrapper -->
</div>
</template>

<script>
import Sidebar from './Sidebar.vue'
import Topbar from './Topbar.vue'
import Footer from './Footer.vue'

export default {
    components: {
        Sidebar,
        Topbar,
        Footer
    }
}
</script>