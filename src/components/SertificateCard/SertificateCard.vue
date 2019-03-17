<template>
  <div class="sertificate_card">
    <div class="indicator" :style="style"></div>

    <div class="view_data" v-if="!editing">
      <h2>Сертификат №{{ sertificate.number }}</h2>
      <div class="row">
        <div class="data">
          <div class="user_data">
            <table>
              <tr align="left">
                <td width="150">
                  <strong>Имя:</strong>
                </td>
                <td>{{ sertificate.name }}</td>
              </tr>
              <tr align="left">
                <td>
                  <strong>Фамилия:</strong>
                </td>
                <td>{{ sertificate.soname }}</td>
              </tr>
              <tr align="left">
                <td>
                  <strong>Отчество:</strong>
                </td>
                <td>{{ sertificate.phname }}</td>
              </tr>
            </table>
          </div>

          <div class="sertificate_data">
            <table>
              <tr align="left">
                <td width="150">
                  <strong>Статус:</strong>
                </td>
                <td>{{ sertificate.actual ? 'Сертификат активирован' : 'Сертификат не активирован'}}</td>
              </tr>
              <tr align="left">
                <td>
                  <strong>Группа:</strong>
                </td>
                <td>{{ sertificate.cert_group_name }}</td>
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
            @click="activate(sertificate.number)"
          >
            Активировать
          </button>
          
          <button
            type="button"
            class="btn btn-outline-dark"
            v-show="!isActiveted"
            @click="deleteSertificate(sertificate.number)"
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
            <td><input type="text" name="name" :value="sertificate.name"></td>
          </tr>
           <tr>
            <td align="left"><label for="soname">Фамилия</label></td>
            <td><input type="text" name="soname" :value="sertificate.soname"></td>
          </tr>
           <tr>
            <td align="left"><label for="phname">Отчество</label></td>
            <td><input type="text" name="phname" :value="sertificate.phname"></td>
          </tr>
           <tr>
            <td align="left"><label for="birthday">Дата рождения</label></td>
            <td><input type="text" name="birthday" placeholder="ДД.ММ.ГГГ"></td>
          </tr>
          <tr>
            <td align="left"><label for="email">E-mail</label></td>
            <td><input type="text" name="email" placeholder="example@example.com"></td>
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
  name: "SertificateCard",

  data() {
    return {
      editing: false,
      message: null
    };
  },

  computed: {
    // ...mapGetters(["name", "soname", "phname", "birthday", "email"]),

    sertificate() {
      return this.$store.getters.sertificate;
    },

    isActiveted() {
      return this.sertificate.actual == 1;
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
      this.$store.dispatch("activateSertificate", number).then(res => {
        console.log(res);
        
        this.$store
          .dispatch("getSertificate", `${this.sertificate.number}`)
          .then(() => {
            if (!this.isActiveted) {
              this.$store.dispatch("setLocalActivateStatus");
            }
          });
      });
    },

    edit() {
      this.editing = true;
    },

    save(evt) {
      this.editing = false;
      console.log(evt.target.name.value);

      let data ={
        name: evt.target.name.value,
        soname: evt.target.soname.value,
        phname: evt.target.phname.value,
        birthday: evt.target.birthday.value,
        email: evt.target.email.value, 
      }

      evt.preventDefault();
      this.$store.dispatch("editSertificate", { number: this.sertificate.number, data })
        .then(() => {
          this.$store.dispatch("getSertificate", `${this.sertificate.number}`);
        });
    },

    deleteSertificate(number) {
      this.$store.dispatch("deleteSertificate", number ).then(() => {
         this.$store.commit('DELETE_SERTIFICATE')

      });
    },

    validate() {
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

      console.log(this.name);

      const regExpName = /^[а-яА-ЯёЁ]+([ -]{1}[а-яА-ЯёЁ]+){0,3}$/;
      const regExpSoname = /^[а-яА-ЯёЁ]+([ -]{1}[а-яА-ЯёЁ]+){0,3}$/;
      const regExpPhname = /^[а-яА-ЯёЁ]+([ -]{1}[а-яА-ЯёЁ]+){0,3}$/;
      const regExpEmail = /^[А-яёЁa-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\.   [А-яёЁa-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9А-яёЁ](?:[a-zA-Z0-9-А-яёЁ]*[a-zA-Z0-9А-яёЁ])?\.)+[a-zA-Z0-9А-яёЁ]   (?:[a-zA-Z0-9-А-яёЁ]*[a-zA-Z0-9А-яёЁ])?$/;
      const regExpBirthday = /^([0-9]{2})\.([0-9]{2})\.([0-9]{4})$/;
      // if()
    }
  }
};
</script>

<style lang="scss" scoped>
.sertificate_card {
  position: relative;
  display: inline-block;
  text-align: center;
  width: 1000px;
  background-color: #fff;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
  padding: 30px;
  font-size: 16px;
}
.sertificate_card h2 {
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
.sertificate_data {
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

