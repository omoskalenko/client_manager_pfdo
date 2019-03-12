
<template>

 <nav class="navbar navbar-light bg-light">
              <button class="btn btn-primary" @click="logout">Выход</button>
  </nav>

</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => this.$router.push('/login'))
    }
  }
}
</script>


<style lang="scss">
.message_box {
  display: block;
  margin: 0 auto;
  margin-top: 25%;
  font-size: 25px;
  font-style: bold;
  color: #444;
  text-align: center;
}

</style>
