<template>
  <nav class="navbar fixed-top" style="opacity: 1;">
    <!-- <div class="d-flex align-items-center navbar-left">
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
    </div> -->
    <div class="logo offset-6">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 261.76     226.69" width="48" height="48">
      <g transform="matrix(1.3333 0 0 -1.3333 -76.311    313.34) " >
        <g transform="translate(178.06 235.01)">
          <path d="m0    0-22.669-39.264-22.669 39.264h-75.491l98.16-170.02 98.16 170.02z"    fill="#41b883"/>
        </g>
        <g transform="translate(178.06 235.01)">
          <path d="m0    0-22.669-39.264-22.669 39.264h-36.227l58.896-102.01 58.896 102.01z"    fill="#34495e"/>
        </g>
      </g>
    </svg>

    </div>
    
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
  height: 100px;
  padding: 1.5rem 0 1.5rem 0;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);}
  // .logo {
  //   margin: 0 auto;
  // }
.user {
  margin-right: 50px;
}
button {
  margin: 0 20px 0 20px;
}
</style>