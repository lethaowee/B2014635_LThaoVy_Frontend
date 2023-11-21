<template>
  <div id="login-session">
    <div class="login-title container align-self-center">
      <p id="title">Quản lý đặt hàng</p>
      <button
        type="button"
        class="login-button"
        data-bs-toggle="modal"
        data-bs-target="#loginModal"
      >
        Đăng nhập
      </button>
    </div>

    <div
      class="modal fade"
      id="loginModal"
      tabindex="-1"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
      data-backdrop="false"
    >
      <div class="modal-dialog-centered modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="loginTitle">Đăng nhập</h5>
            <button
              type="button"
              id="login-form-close-btn"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <loginForm @submit="onLogin" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loginForm from "@/components/LoginForm.vue";
import nhanVienService from "@/services/nhanvien.service";
import { useCookies } from "vue3-cookies";
import Swal from "sweetalert2";

export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    return {
      nhanvien: {},
      nhanviens: [],
    };
  },
  components: {
    loginForm,
  },
  computed: {},
  methods: {
    async getAllNhanVien() {
      try {
        this.nhanviens = await nhanVienService.getAll();
      } catch (err) {
        console.log(err);
        this.displayError(err);
      }
    },
    async checkLogin() {
      try {
        var msnv = this.$cookies.get("MSNV");
        let nhanvien = await nhanVienService.getOne(msnv);
        if (nhanvien.username.length > 0) {
          this.$router.push({ name: "home_page" });
        } else throw new Error("random error");
      } catch (error) {
        this.$router.push({ name: "login" });
      }
    },
    async onLogin(user) {
      try {
        document.getElementById("login-form-close-btn").click();
        var check = false;
        this.nhanviens.forEach((us) => {
          if (us.MSNV == user.MSNV && us.Password == user.Password)
            check = true;
        });
        if (check) {
          this.$cookies.set("MSNV", user.MSNV);
          this.$router.push({ name: "home_page" });
        } else {
          throw new Error("Sai MSNV hoặc mật khẩu!");
        }
      } catch (err) {
        console.log(err);
        this.displayError(err);
      }
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    hideHeaderAndFooter() {
      this.$emit("isShowHeaderAndFooter", false);
    },
    displaySuccess(message) {
      Swal.fire({
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1000,
      });
    },
    displayError(message) {
      Swal.fire({
        title: "Lỗi!",
        text: message,
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  },
  mounted() {
    this.hideHeaderAndFooter();
    this.getAllNhanVien();
  },
};
</script>

<style>
#login-session {
  overflow: hidden;
  width: 100%;
  height: 1000px;
  background-image: url("../assets/Wallpaper.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#title {
  text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
  font-family: "Lalezar";
  font-size: 60px;
}

#loginTitle {
  position: relative;
  left: 39%;
}

#login-register-button {
  cursor: pointer;
  text-decoration: underline;
}

#login-register-button:hover {
  color: #0f2c59;
}

#login-register {
  font-family: "inter";
  font-style: italic;
}

#quote {
  font-family: "inter";
  font-style: italic;
  font-size: 30px;
}

.login-title {
  color: #fff0dc;
  position: fixed;
  top: 35%;
  left: 10%;
}

.login-button {
  color: #fff0dc;
  font-size: 30px;
  border-radius: 50px;
  padding: 15px 30px;
  background-color: #0f2c59;
}

.login-button:hover {
  background-color: #1b3f75;
}
</style>
