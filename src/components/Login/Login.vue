<template>
  <div class="container">
    <div class="row">
      <div class="login_form__wrapper">
        <div class="error_message" style="color: tomato">
          <p v-if="status === 'error'">{{ error }}</p>
        </div>
        <form>
          <div class="form-group">
            <label for="poit_of_entry">Точка входа</label>
            <input
              required 
              v-model="pointOfEntry"
              type="text"
              class="form-control"
              id="poit_of_entry"
              placeholder="api.example.com"
            >
            <span style="color: tomato">{{ fieldErrors.pointOfEntry }}</span>
          </div>
          <div class="form-group">
            <label for="username">Имя пользователя</label>
            <input
              required 
              v-model="username"
              type="text"
              class="form-control"
              id="username"
              placeholder="Введите имя пользователя"
            >
            <span style="color: tomato">{{ fieldErrors.username }}</span>
          </div>

          <div class="form-group">
            <label for="password">Пароль</label>
            <input
              required 
              v-model="password"
              type="password"
              class="form-control"
              id="password"
              placeholder="Пароль"
            >
            <span style="color: tomato">{{ fieldErrors.username }}</span>
          </div>

          <button @click="login" class="btn btn-primary">
            <div 
            class="text-center"
            v-if="status === 'loading'"
            >
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            <span v-else>
              Войти
            </span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      // pointOfEntry: "api-test.pfdo.ru",
      // username: "candidate_api_manager",
      // password: "Us3oUs3M5M",
      pointOfEntry: "",
      username: "",
      password: "",
      fieldErrors: {
        pointOfEntry: undefined,
        username: undefined,
        password: undefined,
      },
    };
  },
  computed: {

    status() {
      return this.$store.getters.status;
    },
    error() {
       const error = this.$store.getters.errorDetail;
        if (error.message === "Cannot read property 'data' of undefined") return "Некоректная точка входа"  
    }
  },

  methods: {
    login(event) {
      event.preventDefault();
      this.fieldErrors = this.validateForm({
          pointOfEntry: this.pointOfEntry,
          username: this.username,
          password: this.password
        });
      if (Object.keys(this.fieldErrors).length) return;

      this.$store
        .dispatch("login", {
          pointOfEntry: this.pointOfEntry,
          username: this.username,
          password: this.password
        })
        .then(() => this.$router.push("/"))
    },

    validateForm(fields) {
      const errors = {};
      if (!fields.pointOfEntry && isPointOfEntry(fields.pointOfEntry)) errors.pointOfEntry = "Необходимо указать точку входа";
      if (!fields.username) errors.username = "Введите логин";
      if (!fields.password) errors.password = "Введите пароль";

      return errors;
    },

    isPointOfEntry(pointOfEntry) {
      const re = /(api)?\.[A-z]+\.[A-z]{2,}/;
      return re.test(pointOfEntry)
    }

  }
};
</script>



<style lang="scss" scoped>
.login_form__wrapper {
  margin: 0px auto;
  padding: 30px;
  display: block;
  // height: 350px;
  width: 500px;
  border: 1px solid #eeeeee;
  box-shadow: 2px 2px 20px 1px rgb(238, 238, 238);
  background-color: #fff;
  border-radius: 3px;
}
input::placeholder {
  color: #999;
}
.error_message {
  display: block;
  height: 50px;
}
</style>
