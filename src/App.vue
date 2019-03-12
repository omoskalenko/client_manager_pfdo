<template>
  <div id="app">
      <div class="container-fluid">
            <div class="nav" v-if="shuldShowNavigation">
              <button @click="logout">Выход</button>
            </div>
        <router-view></router-view>

        </div>   
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
  computed: {
    shuldShowNavigation() {
      return this.$route.path !== '/login'
    }
  },

  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => this.$router.push('/login'))
    }
  }
  
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
