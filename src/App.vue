<template>
  <div id="app">
    <NavBar v-if="isAutorized"/>
    <SideBar v-if="isAutorized"/>
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
import SideBar from "./components/SideBar/SideBar.vue";
import SearchBox from "./components/Search/SearchBox.vue";
import Create from "./components/Create/CreateForm.vue";

export default {
  components: {
    Login,
    NavBar,
    SideBar,
    SearchBox,
    CreateForm
  },

  computed: {
    ...mapGetters(["isAutorized"])
  }
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
</style>



