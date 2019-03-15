<template>
  <div>
    <NavBar/>


    <SideBar/>
    <div class="row"> 
    <div class="workspace container">

      <SearchBox />


    </div>
  </div>
    </div>
    
</template>
<script>
import { mapGetters } from "vuex";

import NavBar from "../NavBar/NavBar.vue";
import SideBar from "../SideBar/SideBar.vue";
import SearchBox from "../Search/SearchBox.vue";

export default {
  components: {
    NavBar,
    SideBar,
    SearchBox,
  },

  // created() {
  //   this.$store.dispatch('autorefreshToken', 15).catch(error => {
  //       this.$store.dispatch('logout', error).then(() => {
  //         this.$router.push("/login");
  //       });
  //     });
  // },

  computed: {
    ...mapGetters(["sertificate", "errorDetail"])
  },

  methods: {
    getSertificate(number) {
      this.$store.dispatch("getSertificate", number).catch(error => {
        this.$store.dispatch("logout", error).then(() => {
          this.$router.push("/login");
        });
      });
    }
  }
};
</script>


<style lang="scss">
.workspace {
  display: inline-block;
  position: relative;
  top: 150px;
  width: 100%;
  height: 100%;
}
</style>
