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

import Login from './components/Login/Login.vue'
import Dashboard from './components/Dashboard/Dashboard.vue'

export default {
  components: {
    Login,
    Dashboard
  },
  // computed: {
  //   shuldShowNavigation() {
  //     return this.$route.path !== '/login'
  //   }
  // },
  created: {
    axios.interceptors.response.use(undefined, function (err) {
    return new Promise(function (resolve, reject) {
    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
    // if you ever get an unauthorized, logout the user
      this.$store.dispatch('AUTH_LOGOUT')
    // you can also redirect to /login if needed !
      }
      throw err;
    });
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
