<template>
  <div id="app">
    <!-- <div class="nav" v-if="shuldShowNavigation">
              <button class="btn btn-primary" @click="logout">Выход</button>
    </div>-->
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios';

import Login from './components/Login/Login.vue'
import Dashboard from './components/Dashboard/Dashboard.vue'

export default {
  components: {
    Login,
    Dashboard
  }
}

</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
