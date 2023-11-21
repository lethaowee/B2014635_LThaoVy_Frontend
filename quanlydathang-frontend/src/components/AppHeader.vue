<template>
  <nav id="AppHeader" class="navbar fixed-top navbar-expand-lg navbar-dark p-md-3">
    <div class="container" id="AppHeaderContainer">
      <a class="navbar-brand" href="http://localhost:3001">
        <img style="width: 33px; height: 33px;" src="../assets/logo.png" alt="">
        Quản lý đặt hàng
      </a>
      <div>
        <a href="http://localhost:3001/hanghoa" style="cursor: pointer; margin-right: 50px;" class="navbar-brand">Hàng hóa</a>
        <a style="cursor: pointer;" class="navbar-brand" @click="delete_cookie()"><font-awesome-icon
            icon="right-from-bracket" /> Đăng xuất</a>

      </div>

    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    }
  },
  methods: {
    delete_cookie() {
      this.$cookies.set('MSNV', '');
      this.$router.push({ name: "login" });
    },
  },
  mounted() {
  }
}
</script>


<style>
.dropdown {
  margin: 0 0 0 20px;
}

.dropdown-item,
hr {
  padding: 0px;
  margin: 0px;
}

#AppHeader {
  font-size: 25px;
}

#AppHeader-user {
  padding: 5px 10px;
  background-color: transparent;
  border-radius: 10px;
}

/*  */
</style>