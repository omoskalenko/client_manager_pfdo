<template>
  <div class="container">
    <div class="row">
      
      <div class="login_form__wrapper">
       <div class="error_message" :style="errorStyle">
          <p v-if="status === 'error'">{{ error.message }} <br/> Неверное имя пользователя или пароль</p>
       </div>
        <form>
          <div class="form-group">
            <label for="username">Имя пользователя</label>
            <input
              :value="username"
              type="text"
              class="form-control"
              id="username"
              placeholder="Введите имя пользователя"
            >
          </div>

          <div class="form-group">
            <label for="password">Пароль</label>
            <input
              :value="password"
              type="password"
              class="form-control"
              id="password"
              placeholder="Пароль"
            >
          </div>
        
          <!-- <div class="form-group form-check">
        <input type="checkbox" id="remember">
        <label for="remember">Запомнить меня</label>
          </div>-->
          <button @click="login" class="btn btn-primary">Войти</button>

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
      username: "candidate_api_manager",
      password: "Us3oUs3M5M",
      errorStyle: 'color: tomato'
    };
  },
  computed: {
    status() {
      return this.$store.getters.status
    },
    error() {
      return this.$store.getters.error
    },
  },

  methods: {
    login(event) {
      event.preventDefault();
      this.$store
        .dispatch("login", { username: this.username, password: this.password })
        .then(() => this.$router.push("/dashboard"));
    }
  }
};
</script>



<style lang="scss" scoped>
.login_form__wrapper {
  margin: 50px auto;
  padding: 30px;
  display: block;
  height: 350px;
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
