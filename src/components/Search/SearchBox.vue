<template>
  <div id="search_box">
    <div class="row">
      <div class="search">
        <i class="fas fa-search"></i>
        <input 
          type="text" 
          id="search" 
          maxlength="10" 
          pattern="[0-9]{10}"
          placeholder="9905000000" 
          v-model="number"
          @keyup.enter="seach()"
          >
        <button 
        class="btn btn-primary" 
        type="button" 
        @click="seach()"
        
        >Поиск</button>
      </div>
    </div>
    <div class="row">
      <div class="result">
        <div 
            class="text-center"
            v-if="status === 'loading'"
            >
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
        </div>
        <p class="message" v-show="message">{{ message }}</p>

        <div v-if="certificate && !message">
          <CertificateCard  />  
        </div>


      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import CertificateCard from '../CertificateCard/CertificateCard.vue'

export default {
  name: "SearchBox",

  components: {
    CertificateCard
  },

  data() {
    return {
      number: "",
      message: "",
      // certificate: null

    };
  },

  computed: {
  ...mapGetters([ "certificate", "status" ])
  },

  methods: {
    seach() {
      this.message = "";
      if(!this.number) return false;
      if (!/[0-9]{10}/.test(this.number)) {
        return this.message = "Номер не должен быть короче 10 символов и должен состоять только из цифр"
      } else {
        this.$store.dispatch("getCertificate", this.number).then(res => {
          if(res.result_message === "Запись не найдена") {
            this.message = "Запись не найдена"
            return;
          }
          // this.certificate = res.data;

        })
      }
      
    },
  }
};
</script>


<style lang="scss">
.search {
  position: relative;
  margin: 0 auto;
}
.search i {
  display: inline;
  position: absolute;
  top: 4px;
  left: -30px;
  font-size: 25px;
}
.search input {
  display: inline-block;
  outline: none;
  text-align: center;
  // padding-left: 180px;
  border-style: none;
  min-width: 230px;
  width: 400px;
  border-radius: 20px;
  // border: none;
  border: 1px solid #145388;
  // padding: 0.5rem 1rem;
  // text-align: center;
  line-height: 1px;
  font-size: 25px;
  color: #212121;
}
.search button {
  position: absolute;
  top: -3px;
}
.start {
  position: absolute;
  font-size: 25px;
  margin-top: 10px;
  top: -12px;
  left: 125px;
}
.result {
  margin: 50px auto;
  
  text-align: center;
}
.result .message {
  text-align: center;
  font-size: 25px;
  color: tomato;
  
}
</style>
