<template>
  <div class="certificate_card">
    <div class="indicator" :style="style"></div>
    
    <div class="view_data" v-if="!editing">
      <h2>Сертификат №{{ certificate.number }}</h2>
      <div class="row">
        <div class="data">
          <div class="user_data">
            <table>
              <tr align="left">
                <td width="150">
                  <strong>Имя:</strong>
                </td>
                <td>{{ certificate.name }}</td>
              </tr>
              <tr align="left">
                <td>
                  <strong>Фамилия:</strong>
                </td>
                <td>{{ certificate.soname }}</td>
              </tr>
              <tr align="left">
                <td>
                  <strong>Отчество:</strong>
                </td>
                <td>{{ certificate.phname }}</td>
              </tr>
            </table>
          </div>

          <div class="certificate_data">
            <table>
              <tr align="left">
                <td width="150">
                  <strong>Статус:</strong>
                </td>
                <td>{{ certificate.actual ? 'Сертификат активирован' : 'Сертификат не активирован'}}</td>
              </tr>
              <tr align="left">
                <td>
                  <strong>Группа:</strong>
                </td>
                <td>{{ certificate.cert_group_name }}</td>
              </tr>
              <tr align="left">
                <td>
                  <strong>-</strong>
                </td>
                <td>-</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="row">
        <div v-if="!editing" class="button_group offset-4">
          <button
            type="button"
            class="btn btn-outline-dark"
            @click="edit()"
          >
            Редактировать
          </button>
          
          <button
            type="button"
            class="btn btn-outline-dark"
            :disabled="isActiveted"
            @click="activate(certificate.number)"
          >
            Активировать
          </button>
          
          <button
            type="button"
            class="btn btn-outline-dark"
            v-show="!isActiveted"
            @click="deleteCertificate(certificate.number)"
          >Удалить</button>
        </div>
      </div>
    </div>

    <div class="edit_data" v-if="editing">
      <form @submit="save" class="ui form">
        <div class="field">
          <table>
          <tr>
            <td align="left"><label for="name">Имя</label></td>
            <td><input type="text" name="name" :value="certificate.name"></td>
            <span style="color: tomato">{{ fieldErrors.name }}</span>
          </tr>
           <tr>
            <td align="left"><label for="soname">Фамилия</label></td>
            <td><input type="text" name="soname" :value="certificate.soname"></td>
            <span style="color: tomato">{{ fieldErrors.soname }}</span>
          </tr>
           <tr>
            <td align="left"><label for="phname">Отчество</label></td>
            <td><input type="text" name="phname" :value="certificate.phname"></td>
            <span style="color: tomato">{{ fieldErrors.phname }}</span>
          </tr>
           <tr>
            <td align="left"><label for="birthday">Дата рождения</label></td>
            <td><input type="text" name="birthday" placeholder="ДД.ММ.ГГГ"></td>
            <span style="color: tomato">{{ fieldErrors.birthday }}</span>
          </tr>
          <tr>
            <td align="left"><label for="email">E-mail</label></td>
            <td><input type="text" name="email" placeholder="example@example.com"></td>
            <span style="color: tomato">{{ fieldErrors.email }}</span>
          </tr>
          
          </table>
        </div>
        <button class="btn btn-outline-dark">Сохранить</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CertificateCard",

  data() {
    return {
      editing: false,
      fieldErrors: {
        name: '',
        soname: '',
        phname: '',
        birthday: '',
        email: '', 
      }
    };
  },

  computed: {
    // ...mapGetters(["name", "soname", "phname", "birthday", "email"]),

    certificate() {
      return this.$store.getters.certificate;
    },

    isActiveted() {
      return this.certificate.actual == 1;
    },

    style() {
      if (!this.isActiveted) {
        return "background-color: tomato";
      }
      return "background-color: green";
    }
  },

  methods: {
    activate(number) {
      this.$store.dispatch("activateCertificate", number).then(res => {        
        this.$store
          .dispatch("getCertificate", `${this.certificate.number}`)
          .then(() => {
            if (!this.isActiveted) {
              this.$store.commit("UPDATE_CERTIFICATE", { actual: 1 });
            }
          });
      });
    },

    edit() {
      this.editing = true;
    },

    save(evt) {
      evt.preventDefault();

      let data = {
        name: evt.target.name.value,
        soname: evt.target.soname.value,
        phname: evt.target.phname.value,
        birthday: evt.target.birthday.value,
        email: evt.target.email.value,  
      }

      this.fieldErrors = this.validateForm(data);
      if (Object.keys(this.fieldErrors).length) return;

    
      this.$store.dispatch("editCertificate", { number: this.certificate.number, data })
        .then(() => {         
          this.$store.commit("UPDATE_CERTIFICATE", data);
          this.editing = false;
        });
    },

    deleteCertificate(number) {
      this.$store.dispatch("deleteCertificate", number ).then(() => {
         this.$store.commit('DELETE_CERTIFICATE');

      });
    },

    validateForm(fields) {
      const errors = {};

      if (!this.isValidName(fields.name))
        errors.name =
          "Имя должно состоятьиз букв русского алфавита и не превышать 60 символов";
      if (!this.isValidSoname(fields.soname))
        errors.soname =
          "Фамилия должна состоятьиз букв русского алфавита и не превышать 60 символов";
      if (!this.isValidPhname(fields.phname))
        errors.phname =
          "Отчество должно состоятьиз букв русского алфавита и не превышать 60 символов";
      if (!this.isValidBirthday(fields.birthday))
        errors.birthday =
          "Проверьте корректность введенной даты. Дата рождения должна быть в формате ДД.ММ.ГГГГ, год рождения от 1998";
      if (!this.isValidEmail(fields.email))
        errors.email = "Обязательное поле. Адрес электронной почты: ограничение в 255 символов";

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
      //проверка существования даты 
      function validDate(date) {
        var d_arr = date.split(".");
        var d = new Date(d_arr[2] + "/" + d_arr[1] + "/" + d_arr[0] + ""); // дата в 
        if (
          d_arr[2] != d.getFullYear() ||
          d_arr[1] != d.getMonth() + 1 ||
          d_arr[0] != d.getDate()
        ) {
          return false; // неккоректная дата
        }
        return true;
      }

      return (
        regExpBirthday.test(date) &&
        date.match(regExpBirthday)[3] >= 1998 &&
        date.match(regExpBirthday)[1] >= 1 &&
        date.match(regExpBirthday)[1] <= 31 &&
        date.match(regExpBirthday)[2] >= 1 &&
        date.match(regExpBirthday)[2] <= 12
        && validDate(date)
      );
    }

  }
};
</script>

<style lang="scss" scoped>
.certificate_card {
  position: relative;
  display: inline-block;
  text-align: center;
  width: 1000px;
  background-color: #fff;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
  padding: 30px;
  font-size: 16px;
}
.certificate_card h2 {
  margin-bottom: 20px;
}
.data,
table {
  margin: 20px auto;
  text-align: center;
}
label {
  margin-right: 20px;
}
.user_data {
  display: inline-block;
  margin-right: 100px;
}
.certificate_data {
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

