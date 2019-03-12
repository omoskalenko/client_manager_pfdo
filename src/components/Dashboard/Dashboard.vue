<template>
  <div class="container-fluid">
    <NavPanel />
 
    <div class="row">

      <SidePanel />

      <div class="col-md-10">
        <div class="find_sert">
          <button @click="getSert('9905000110')">Найти сертификат</button>

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

import NavPanel from "../NavPanel/NavPanel.vue";
import SidePanel from "../SidePanel/SidePanel.vue";

export default {
  components: {
    NavPanel,
    SidePanel
  },
  computed: {
    ...mapGetters(["sertificate"])
  },

  methods: {
    getSert(number) {
      if (this.isExpire()) {
        this.refreshToken().then(() => {
          this.$store.dispatch("getSertificate", number);
        });
      }
      this.$store.dispatch("getSertificate", number);
    },

    isExpire() {
      return Date.now() >= localStorage.getItem("expires_at");
    },

    refreshToken() {
      return this.$store.dispatch("refreshToken");
    }
  }
};
</script>


<style lang="scss">
.container-fluid {
  height: 100%;
}
</style>
