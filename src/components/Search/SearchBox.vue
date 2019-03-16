<template>
  <div>
    <div class="row">
      <div class="search">
        <i class="fas fa-search"></i>
        <div class="start">9905</div>
        <input 
          type="text" 
          id="search" 
          maxlength="6" 
          pattern="[0-9]{6}"
          placeholder="000000" 
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
        <p class="error" v-if="error">{{error}}</p>

        <div v-if="sertificate && !error">
          <SertificateCard  />  
        </div>


      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import SertificateCard from '../SertificateCard/SertificateCard.vue'

export default {
  name: "SearchBox",

  components: {
    SertificateCard
  },

  data() {
    return {
      number: "000111",
      error: "",
      // sertificate: null

    };
  },

  computed: {
  ...mapGetters([ "sertificate", "status" ])
  },

  methods: {
    seach() {
      this.error = "";
      if(!this.number) return false;
      if (!/[0-9]{6}/.test(this.number)) {
        return this.error = "Номер не должен быть короче 6 символов и должен состоять только из цифр"
      } else {
        this.$store.dispatch("getSertificate", `9905${this.number}`).then(res => {
          if(res.result_message === "Запись не найдена") {
            this.error = "Запись не найдена"
            return;
          }
          // this.sertificate = res.data;

        })
      }
      
      
    }
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
  padding-left: 180px;
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
.result p {
  text-align: center;
  font-size: 25px;
  color: tomato;
  
}
</style>
