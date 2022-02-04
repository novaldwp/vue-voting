<template>
  <router-view></router-view>
  <!-- <div id="wrapper">
    <Main>
      <router-view></router-view>
    </Main>
  </div> -->
</template>

<script>
import Main from './components/Layouts/Main.vue'

export default {
  components: {
    Main
  }
}
</script>