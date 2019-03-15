<template>
  <div>
    <NavBar/>
    <div class="row"> 

    <SideBar/>

    <div class="workspace container">
      <div class="find_sert">

        <button @click="getSertificate('9905000110')">Найти сертификат</button>

        <div class="sertificate_card" v-if="sertificate">
          <h2>Номер {{ sertificate.number }}</h2>
          <ul>
            <li>Имя {{ sertificate.name }}</li>
            <li>Фамилия {{ sertificate.soname }}</li>
            <li>Отчество {{ sertificate.phname }}</li>
            <li>Активированый {{ sertificate.actual == 1 ? 'Да' : 'Нет'}}</li>
            <li>{{ sertificate.cert_group_name }}</li>
            <li></li>
          </ul>
        </div>

      </div>
    </div>
  </div>
    </div>
    
</template>
<script>
import { mapGetters } from "vuex";

import NavBar from "../NavBar/NavBar.vue";
import SideBar from "../SideBar/SideBar.vue";

export default {
  components: {
    NavBar,
    SideBar
  },

  created() {
    this.$store.dispatch('autorefreshToken', 15).catch(error => {
        this.$store.dispatch('logout', error).then(() => {
          this.$router.push("/login");
        });
      });
  },

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
