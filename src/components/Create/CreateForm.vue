<template>

<div class="create_sertificate">
  <h2 v-if="create">Сертификат №{{setNumber}} создан</h2>
  <div class="sertificate_card" v-show="!create">
    <h2>Новый сертификат</h2>
    <form @submit="save" class="ui form">
      <div class="field">
        <table>
          <tr>
            <td align="left">
              <label for="number">Номер</label>
              <p v-show="error_message">{{error_message}}</p>
            </td>
            <td>
              <input type="text" name="number" v-model="number" disabled>
            </td>
          </tr>
          <tr>
            <td align="left">
              <label for="name">Имя</label>
            </td>
            <td>
              <input type="text" name="name" v-model="name">
            </td>
          </tr>
          <tr>
            <td align="left">
              <label for="soname">Фамилия</label>
            </td>
            <td>
              <input type="text" name="soname" v-model="soname">
            </td>
          </tr>
          <tr>
            <td align="left">
              <label for="phname">Отчество</label>
            </td>
            <td>
              <input type="text" name="phname" v-model="phname">
            </td>
          </tr>
          <tr>
            <td align="left">
              <label for="birthday">Дата рождения</label>
            </td>
            <td>
              <input type="text" name="birthday" v-model="birthday" placeholder="ДД.ММ.ГГГ">
            </td>
          </tr>
          <tr>
            <td align="left">
              <label for="email">E-mail</label>
            </td>
            <td>
              <input type="text" name="email" v-model="email" placeholder="example@example.com">
            </td>
          </tr>
        </table>
      </div>
      <button class="btn btn-outline-dark">Сохранить</button>
    </form>
  </div>

  <div class="history">
    <h2>История</h2>
    <hr>
    <ul>
      <li v-for="num in history" v-bind:key="num">{{num}}</li>
    </ul>
  </div>

  </div>
</template>

<script>
import SertificateCard from '../SertificateCard/SertificateCard.vue'

export default {
  name: "CreateForm",
  components: {
    SertificateCard
  },

  data() {
    return {
      name: '',
      soname: '',
      phname: '',
      birthday: '',
      email: '',
      create: false,
      error_message: '',
      setNumber: ''
    }
  },

  computed: {
     number() {
         return `9905${Math.floor(Math.random() * (999999 - 100000)) + 100000}`;
     },

     history() {
       return this.$store.getters.history;
     }

  },

  methods: {
    save(evt) {
      evt.preventDefault();
      console.log(evt.target.number.value);
      
      let data = {
        number: evt.target.number.value,
        name: evt.target.name.value,
        soname: evt.target.soname.value,
        phname: evt.target.phname.value,
        birthday: evt.target.birthday.value,
        messages_email: evt.target.email.value
      };

      this.$store
        .dispatch("createSertificate", data)
        .then(res => {
          this.create = true;
          this.setNumber = res.data.number
          setInterval(() => {
            this.create = false;
            this.error_message = '';
          }, 2000)
          
        }).catch(error => {
          this.error_message = error;
          
        });
    }

  }
};
</script>

<style>
.sertificate_card {
  position: relative;
  display: inline-block;
  text-align: center;
  /* width: 1000px; */
  background-color: #fff;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
  padding: 20px 80px 20px 80px;
  font-size: 16px;
}
.field {
  display: block;
  margin: 0 auto;
  padding-bottom: 30px;
}
.history {
  display: block;
  margin-top: 30px;
  font-size: 20px;
}
.history ul {
  padding-left: 0;
}
.history li {
  list-style: none;
}
</style>
