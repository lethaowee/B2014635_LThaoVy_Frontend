<template>
  <footer class="text-center text-lg-start bg-white text-muted">
    <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
      <div class="me-5 d-none d-lg-block">
        <span>Kết nối với chúng tôi trên:</span>
      </div>

      <div>
        <a href="" class="me-4 link-secondary">
          <font-awesome-icon :icon="['fab', 'facebook-f']" />
        </a>
        <a href="" class="me-4 link-secondary">
          <font-awesome-icon :icon="['fab', 'google']" />
        </a>
        <a href="" class="me-4 link-secondary">
          <font-awesome-icon :icon="['fab', 'instagram']" />
        </a>
        <a href="" class="me-4 link-secondary">
          <font-awesome-icon :icon="['fab', 'linkedin']" />
        </a>
        <a href="" class="me-4 link-secondary">
          <font-awesome-icon :icon="['fab', 'github']" />
        </a>
      </div>
    </section>

    <section class="">
      <div class="container text-center text-md-start mt-5">
        <div class="row mt-3">
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-4">
              <i class="fas fa-gem me-3 text-secondary"></i>Quản lý đặt hàng
            </h6>
            <p>
              Mọi thắc mắc về tính bản quyền và độ xác thực của trang web xin vui lòng liên hệ qua email và số điện thoại.
            </p>
          </div>

          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-4">
              Các trang
            </h6>
            <p>
              <a href="http://localhost:3001" class="text-reset">Trang chủ</a>
            </p>
          </div>

          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-4">Liên hệ</h6>
            <p><i class="fas fa-home me-3 text-secondary"></i><font-awesome-icon icon="building" /> Nguyễn Văn Linh, Ninh
              Kiều, Cần Thơ</p>
            <p>
              <i class="fas fa-envelope me-3 text-secondary"></i><font-awesome-icon icon="envelope" /> support@quanlydathang.com
            </p>
            <p><i class="fas fa-phone me-3 text-secondary"></i><font-awesome-icon icon="phone" /> + 84 939 169 592</p>
          </div>
        </div>
      </div>
    </section>

    <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.025);">
      © 2023 Copyright: QuanLyDatHang
    </div>
  </footer>
  <!-- Footer -->
</template>

<script>
export default {
  data() {
    return {
      user: {}
    }
  },
  methods: {
    goToMainPage() {
      this.$router.push({ name: "home page" });
    },
    goToMyRoom() {
      this.$router.push({ name: "myroom" });
    },

  },
  mounted() {
  }
}
</script>


<style></style>