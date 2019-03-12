<template>
  <div class="login_form__wrapper">
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
      </div> -->
      
      <button @click="login" class="btn btn-primary">Войти</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: 'candidate_api_manager',
      password: 'Us3oUs3M5M'
    }
  },

  methods: {
    login(event) {
      event.preventDefault();
      this.$store.dispatch('authorization', { username: this.username, password: this.password })
    }
  }
}
</script>



<style lang="scss" scoped>
.login_form__wrapper {
  margin: 50px auto;
  padding: 80px;
  display: block;
  height: 350px;
  width: 500px;
  border: 1px solid #eeeeee;
  box-shadow: 2px 2px 20px 1px rgb(238, 238, 238)
}
input::placeholder {
  color: #999;
}
  
</style>
