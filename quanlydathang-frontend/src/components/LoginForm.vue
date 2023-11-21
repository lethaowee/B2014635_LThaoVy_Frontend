<template>
  <form id="login-form">
    <div class="form-floating mb-4">
      <input id="form2Example1" class="form-control" v-model="userLocal.MSNV" @focus="buttonDisabled = false"
        placeholder="" />
      <label class="form-label" for="form2Example1">Mã số nhân viên</label>
    </div>

    <div class="form-floating mb-4">
      <input type="password" id="form2Example2" class="form-control" v-model="userLocal.Password"
        @focus="buttonDisabled = false" placeholder="" />
      <label class="form-label" for="form2Example2">Mật khẩu</label>
    </div>

    <div class="text-center">
      <button type="submit" class=" btn btn-primary btn-block mb-4 loginForm-button" v-on:click="onLogin"
        :disabled="buttonDisabled">Đăng nhập</button>
    </div>

  </form>
</template>

<script>
export default {
  data() {
    return {
      buttonDisabled: false,
      userLocal: {
        MSNV: 0,
        Password: "",
      },
    }
  },
  methods: {
    onLogin() {
      this.buttonDisabled = true;
      this.$emit("submit", this.userLocal);
    }
  }
}
</script>

<style>
#login-form {
  margin: 20px;
}

.loginForm-button {
  color: #FFF0DC;
  background-color: #0F2C59;
}

.loginForm-button:hover {
  background-color: #1b3f75;
}</style>