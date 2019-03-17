<template>

<div class="create_certificate">
  <h2 v-if="create">Сертификат №{{setNumber}} создан</h2>
  <div class="certificate_card" v-show="!create">
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
          <span style="color: tomato">{{ fieldErrors.name }}</span>
          <tr>
            <td align="left">
              <label for="soname">Фамилия</label>
            </td>
            <td>
              <input type="text" name="soname" v-model="soname">   
            </td>            
          </tr>
          <span style="color: tomato">{{ fieldErrors.soname }}</span>
          <tr>
            <td align="left">
              <label for="phname">Отчество</label>
            </td>
            <td>
              <input type="text" name="phname" v-model="phname">
            </td>            
          </tr>
          <span style="color: tomato">{{ fieldErrors.phname }}</span>
          <tr>
            <td align="left">
              <label for="birthday">Дата рождения</label>
            </td>
            <td>
              <input type="text" name="birthday" v-model="birthday" placeholder="ДД.ММ.ГГГ">              
            </td>           
          </tr>
           <span style="color: tomato">{{ fieldErrors.birthday }}</span>
          <tr>
            <td align="left">
              <label for="email">E-mail</label>
            </td>
            <td>
              <input type="text" name="email" v-model="email" placeholder="example@example.com">              
            </td>           
          </tr>
           <span style="color: tomato">{{ fieldErrors.email }}</span>
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
import CertificateCard from '../CertificateCard/CertificateCard.vue'

export default {
  name: "CreateForm",
  components: {
    CertificateCard
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
      setNumber: '',
      fieldErrors: {
        name: undefined,
        soname: undefined,
        phname: undefined,
        birthday: undefined,
        email: undefined,
      }
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
      
      let data = {
        number: evt.target.number.value,
        name: evt.target.name.value,
        soname: evt.target.soname.value,
        phname: evt.target.phname.value,
        birthday: evt.target.birthday.value,
        messages_email: evt.target.email.value
      };

      this.fieldErrors = this.validateForm(data);
      if (Object.keys(this.fieldErrors).length) {
        console.log(this.fieldErrors);
        console.log(Object.keys(this.fieldErrors));
        return;
      };
      
      this.$store
        .dispatch("createCertificate", data)
        .then(res => {
          this.toogleState();
          this.setNumber = res.data.number
          setTimeout(() => {
            this.resetForm();
          }, 2000)
        }).catch(error => {
          this.error_message = error;
        });
    },


    resetForm() {
      this.toogleState();
      this.name = '',
      this.soname = '',
      this.phname = '',
      this.birthday = '',
      this.email = '',
      this.error_message = '';
    },

    toogleState() {
      this.create = !this.create;
    },

    validateForm(fields) {
      // Имя - до 60 символов, проверка по маске /^[а-яА-ЯёЁ]+([ -]{1}[а-яА-ЯёЁ]+){0,3}$/
      // Фамилия - до 60 символов, проверка по маске /^[а-яА-ЯёЁ]+([ -]{1}[а-яА-ЯёЁ]+){0,3}$/
      // Отчество - до 60 символов, проверка по маске /^[а-яА-ЯёЁ]+([ -]{1}[а-яА-ЯёЁ]+){0,3}$/
      // Адрес электронной почты: ограничение в 255 символов, проверка по маске /^[А-яёЁa-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\.   [А-яёЁa-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9А-яёЁ](?:[a-zA-Z0-9-А-яёЁ]*[a-zA-Z0-9А-яёЁ])?\.)+[a-zA-Z0-9А-яёЁ]   (?:[a-zA-Z0-9-А-яёЁ]*[a-zA-Z0-9А-яёЁ])?$/
      // Дата рождения:
      // Соответствие формату "ДД.ММ.ГГГГ",
      // ДД - числа месяца, может принимать значения 1-31
      // ММ - номер месяца, может принимать значения 1-12
      // ГГГГ - год, может приниматься значения с 1998 до текущего года
      // Так же проверяется возможность существования указанной даты, например, дата 31.02.2018 будет признана некорректной     (в феврале нет 31-го дня)
      console.log(fields);
      const errors = {};

      if (!this.isValidName(fields.name)) errors.name = "Имя должно состоятьиз букв русского алфавита и не превышать 60 символов";
      if (!this.isValidSoname(fields.soname)) errors.soname = "Фамилия должна состоятьиз букв русского алфавита и не превышать 60 символов";
      if (!this.isValidPhname(fields.phname)) errors.phname = "Отчество должно состоятьиз букв русского алфавита и не превышать 60 символов";
      if (!this.isValidBirthday(fields.birthday)) errors.birthday = "Дата рождения должна быть в формате ДД.ММ.ГГГГ, год рождения от 1998";
      if (!this.isValidEmail(fields.messages_email)) errors.email = "Адрес электронной почты: ограничение в 255 символов";
    
      return errors;
    },

    isValidName(name) {
      const regExpName = /^[а-яА-ЯёЁ]+([-]{1}[а-яА-ЯёЁ]+){0,3}$/;      
      return regExpName.test(name);
    },
    
    isValidSoname(soname) {
      const regExpSoname = /^[а-яА-ЯёЁ]+([ -]{1}[а-яА-ЯёЁ]+){0,3}$/;
      return regExpSoname.test(soname);
    },

    isValidPhname(phname) {
      const regExpPhname = /^[а-яА-ЯёЁ]+([ -]{1}[а-яА-ЯёЁ]+){0,3}$/;
      return regExpPhname.test(phname);
    },

    isValidEmail(email) {
      const regExpEmail = /^[А-яёЁa-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\.[А-яёЁa-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9А-яёЁ](?:[a-zA-Z0-9-А-яёЁ]*[a-zA-Z0-9А-яёЁ])?\.)+[a-zA-Z0-9А-яёЁ](?:[a-zA-Z0-9-А-яёЁ]*[a-zA-Z0-9А-яёЁ])?$/;
      return regExpEmail.test(email);
    },

    isValidBirthday(date) {
      const regExpBirthday = /^([0-9]{2})\.([0-9]{2})\.([0-9]{4})$/;
      
      return regExpBirthday.test(date) 
      && date.match(regExpBirthday)[3] >= 1998
      && date.match(regExpBirthday)[1] >= 1
      && date.match(regExpBirthday)[1] <= 31
      && date.match(regExpBirthday)[2] >= 1
      && date.match(regExpBirthday)[2] <= 12;

    },


  }
};
</script>

<style>
.certificate_card {
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
