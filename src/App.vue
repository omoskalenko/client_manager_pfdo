<template>
  <div id="app">
    
      <div class="container-fluid">
        <div class="container">
          <div class="row ">
            <button @click="getSert('9905000110')">Получить сертификат</button>
            <p>{{ sertificate }}</p>
              <Login />

          </div>
        </div>
        
      </div>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    Login
  },
  // data() {
  //   return {
  //     sertificate: ''
  //   }
  // },
  computed: {
    ...mapGetters([ 'sertificate' ])
  },

  methods: {
    getSert(number) {
      this.$store.dispatch('getSertificate', number)
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
