<template>
  <div class="sertificate_card">

    <div class="indicator" :style="style"></div>

          <h2>Номер сертификата {{ sertificate.number }}</h2>
<div class="row">
  <div class="data">
        <div class="user_data">
            <table >
              <tr align="left">
                <td width="150"><strong>Имя:</strong></td>
                <td >{{ sertificate.name }}</td>
              </tr>
              <tr align="left">
                <td><strong>Фамилия:</strong></td>
                <td>{{ sertificate.soname }}</td>
              </tr>
              <tr align="left"> 
                <td><strong>Отчество:</strong></td>
                <td>{{ sertificate.phname }}</td>
              </tr>
            </table>
        </div>

          <div class="sertificate_data">
            <table >
              <tr align="left">
                <td width="150"><strong>Статус:</strong></td>
                <td >{{ sertificate.actual == 1 ? 'Сертификат активирован' : 'Сертификат не активирован'}}</td>
              </tr>
              <tr align="left">
                <td><strong>Группа:</strong></td>
                <td>{{ sertificate.cert_group_name }}</td>
              </tr>
              <tr align="left"> 
                <td><strong>-</strong></td>
                <td>-</td>
              </tr>
            </table>
        </div>
    </div>
  </div>
  <div class="row">
    <div class="button_group offset-7">
      <button 
        type="button" 
        class="btn btn-outline-dark"
      >
        Редактировать
      </button>
      <button 
        type="button" 
        class="btn btn-outline-dark" 
        :disabled="!isActiveted"
        @click="activete(sertificate.number)"
      >
        Активировать
      </button>
    </div>
    
  </div>
    </div>
</template>

<script>
export default {
  name: 'SertificateCard',
  props: ["sertificate"],

  computed: {
    isActiveted() {
      return this.sertificate.actual != 1;
    },

    style() {
      if(this.isActiveted) {
        return 'background-color: tomato'
      }
      return 'background-color: green'
    }
  },

  methods: {
    activete(number) {

      this.$store.dispatch('activateSertificate', number)
    },

    edit(changedData) {
      this.$store.dispatch('editSertificate', changedData)
    }
  }
}
</script>

<style lang="scss" scoped>
.sertificate_card {
  position: relative;
  display: inline-block;
  width: 1000px;
  background-color: #fff;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
  padding: 30px;
  font-size: 16px;
}
.sertificate_card h2 {
  margin-bottom: 20px;
}
.data {
  margin: 20px auto;
  text-align: center;
}
.user_data {
  display: inline-block;
  margin-right: 100px;
}
.sertificate_data{
  display: inline-block;
}
.button_group {
  margin-top: 20px;
}
.indicator {
  position: absolute;
  width: 20px;
  height: 30px;
  top: 0px;
  right: 30px;
  background-color: tomato;
}
</style>

