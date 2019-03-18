<template>
  <div id="app">
    <NavBar v-if="shuldShowNavigation"/>
    <div class="sidebar" style="opacity: 1;" v-if="shuldShowNavigation">
    <div class="main-menu">
      <div class="scroll ps" style="height: 327px;">
        <ul class="list-unstyled">
         
          <li :class="this.$route.path === '/' ? 'active' : ''">
            <router-link to="/">
              <i class="fas fa-search"></i> Найти сертификат
            </router-link>
          </li>
           <li :class="this.$route.path === '/create' ? 'active' : ''">
            <router-link to="/create" >
              <i class="fas fa-plus"></i> Создать сертификат
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
    <div class="row">
      <div class="workspace container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

import Login from "./components/Login/Login.vue";
import NavBar from "./components/NavBar/NavBar.vue";
import SearchBox from "./components/Search/SearchBox.vue";
import Create from "./components/Create/CreateForm.vue";

export default {
  components: {
    Login,
    NavBar,
    SearchBox,
    Create
  },

  created() {
    if(localStorage.getItem('access_token')) {
      this.$store.commit('AUTH_SUCCESS');
    } 
  },

  computed: {

    shuldShowNavigation() {
      return this.$route.path !== '/login'
    },
    
  },

};
</script>


<style lang="scss">
html {
  width: 100%;
  height: 100%;
  background: #f8f8f8;
}
body {
  font-family: "Nunito", sans-serif;
  font-size: 0.8rem;
  font-weight: 400;
  color: #212121;
  background: #f8f8f8;
}
body.background {
  height: 100%;
}
body.background main {
  margin: 0 !important;
  height: 100%;
}
body.background main .container {
  height: 100%;
}
.disable-text-selection {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.workspace {
 margin: 150px auto;
}
button {
  color: #212121;
  outline: initial !important;
}

.btn-arrow {
  display: inline-block;
  text-align: center;
  border-radius: 30px !important;
  width: 42px;
  height: 42px;
  line-height: 24px;
}

.btn-arrow i {
  font-size: 15px;
  display: inline-block;
  text-align: center;
}

.btn-sm.btn-arrow {
  width: 34px;
  height: 34px;
  line-height: 17px;
}

.btn-sm.btn-arrow i {
  font-size: 13px;
  line-height: 10px;
}

.btn {
  border-radius: 50px;
  outline: initial !important;
  box-shadow: none !important;
  box-shadow: initial !important;
  font-size: 0.8rem;
  padding: 0.75rem 1.3rem 0.6rem 1.3rem;
  transition: background-color box-shadow 0.1s linear;
}

.btn-shadow {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15), 0 1px 3px 1px rgba(0, 0, 0, 0.15) !important;
  transition: background-color box-shadow 0.1s linear;
}
.btn-shadow:hover,
.btn-shadow:focus {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15), 0 4px 6px 2px rgba(0, 0, 0, 0.15) !important;
}

.btn-empty {
  background: transparent !important;
}

.btn-lg,
.btn-group-lg > .btn,
.btn-group-sm > .btn {
  border-radius: 50px;
}

.btn.default {
  border-radius: 0.1rem;
}

.btn-primary {
  background-color: #145388;
  border-color: #145388;
  color: #fff;
}
.btn-primary:hover {
  color: #fff;
  background-color: #0f3d64;
  border-color: #0f3d64;
}

.check-button {
  cursor: default !important;
}

.check-button.btn-primary {
  background-color: #145388 !important;
  border-color: #145388 !important;
  opacity: 1;
}

.check-button .custom-control {
  min-height: 1.1rem;
  margin-top: -7px;
}
.sidebar {
  display: inline-block;
  position: fixed;
  top: 0;
  bottom: 0;
  padding-top: 100px;
  z-index: 5;
}
.sidebar .main-menu {
  width: 120px;
  height: 100%;
  background: white;
  z-index: 3;
  position: fixed;
  padding-top: 2px;
  left: 0;
}
.sidebar .main-menu.default-transition {
  transition: transform 300ms;
}
.sidebar .main-menu ul li {
  position: relative;
}
.sidebar .main-menu ul li span {
  text-align: center;
  padding: 0 10px;
  line-height: 14px;
}
.sidebar .main-menu ul li a {
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  border-bottom: 1px solid #f3f3f3;
  color: #212121;
  transition: color 300ms;
  transition: background 300ms;
}
.sidebar .main-menu ul li a:hover,
.sidebar .main-menu ul li a:focus {
  color: #145388;
  text-decoration: none;
  background: #f8f8f8;
}
.sidebar .main-menu ul li i {
  font-size: 32px;
  line-height: 42px;
}
.sidebar .main-menu ul li.active a {
  color: #145388;
}
.sidebar .main-menu ul li.active:after {
  content: " ";
  background: #145388;
  color: white;
  border-radius: 10px;
  position: absolute;
  width: 6px;
  height: 90px;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
}
</style>



