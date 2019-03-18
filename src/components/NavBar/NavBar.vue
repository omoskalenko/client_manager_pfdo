<template>
  <nav class="navbar fixed-top" style="opacity: 1;">
    <div class="d-flex align-items-center navbar-left">
      <a href="#" class="menu-button d-none d-md-block">
        <svg class="main" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 17">
          <rect x="0.48" y="0.5" width="7" height="1"></rect>
          <rect x="0.48" y="7.5" width="7" height="1"></rect>
          <rect x="0.48" y="15.5" width="7" height="1"></rect>
        </svg>
        <svg class="sub" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 17">
          <rect x="1.56" y="0.5" width="16" height="1"></rect>
          <rect x="1.56" y="7.5" width="16" height="1"></rect>
          <rect x="1.56" y="15.5" width="16" height="1"></rect>
        </svg>
      </a>
      
      <a href="#" class="menu-button-mobile d-xs-block d-sm-block d-md-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 17">
          <rect x="0.5" y="0.5" width="25" height="1"></rect>
          <rect x="0.5" y="7.5" width="25" height="1"></rect>
          <rect x="0.5" y="15.5" width="25" height="1"></rect>
        </svg>
      </a>
    </div>

    <a class="navbar-logo" href="/">
      <span class="logo d-none d-xs-block"></span>
      <span class="logo-mobile d-block d-xs-none"></span>
    </a>

    <div class="navbar-right">
      <div class="user d-inline-block">
        <button class="btn btn-empty p-0" type="button">
          <span class="name">Пользователь</span>
        </button>
        
        <button class="btn btn-primary" type="button" @click="logout()">Выход</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => this.$router.push("/login"));
    }
  }
};
</script>

<style lang="scss">
.navbar {
  background: white;
  height: 120px;
  padding: 1.5rem 0 1.5rem 0;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
}
.user {
  margin-right: 50px;
}
button {
  margin: 0 20px 0 20px;
}
</style>