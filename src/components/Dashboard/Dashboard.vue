<template>
        <div class="container">
          <div class="row">
            
          </div>
          <div class="row ">
            <button @click="getSert('9905000110')">Получить сертификат</button>
            <p>{{ sertificate }}</p>

          </div>
        </div>
        
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  components: {
    
  },
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
