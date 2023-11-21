<template>
  <div style="display: flex; justify-content: center">
    <div
      style="
        display: flex;
        flex-direction: column;
        width: 30%;
        justify-content: center;
        align-items: center;
      "
    >
      <div
        class="card"
        style="width: 100%; height: 100%; margin-top: 30px; margin-right: 30px"
      >
        <div class="card-body" style="border-radius: 15px">
          <h5>Thông tin tất cả khách hàng</h5>
          <div class="input-group rounded" id="homePage-search-bar">
            <input
              type="search"
              id="search-bar"
              class="form-control rounded"
              v-model="searchKhachHang"
              placeholder="Tìm kiếm khách hàng"
              aria-label="Search"
              aria-describedby="search-addon"
            />
          </div>
          <ul class="list-group" v-for="khachhang in filteredKhachHangs">
            <li
              class="list-group-item align-items-center"
              style="display: flex; justify-content: space-between"
            >
              <div style="display: flex">
                <div>
                  <div>
                    Họ tên:
                    <span style="font-weight: bold">{{
                      khachhang.HoTenKH
                    }}</span>
                  </div>
                  <div>
                    Tài khoản: <span>{{ khachhang.MSKH }}</span>
                  </div>
                  <div>
                    Mật khẩu: <span>{{ khachhang.Password }}</span>
                  </div>
                  <div>
                    Địa chỉ: <span>{{ khachhang.DiaChi }}</span>
                  </div>
                  <div>
                    Số điện thoại: <span>{{ khachhang.SoDienThoai }}</span>
                  </div>
                </div>
              </div>
              <div style="display: flex; flex-direction: column">
                <button
                  class="btn btn-light"
                  @click="confirmRemoveKhachHang(khachhang.MSKH)"
                >
                  <font-awesome-icon icon="trash" />
                </button>

                <button
                  class="btn btn-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#EditKhachHang"
                  @click="selectedKhachHang = khachhang"
                >
                  <font-awesome-icon
                    icon="pen-to-square"
                    style="cursor: pointer"
                  />
                </button>
              </div>
            </li>
          </ul>
          <button
            class="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#registerModal"
            style="width: 100%"
          >
            +
          </button>

          <div
            class="modal fade"
            id="EditKhachHang"
            tabindex="-1"
            aria-labelledby="EditKhachHangLabel"
            aria-hidden="true"
            data-backdrop="false"
          >
            <div class="modal-dialog-centered modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="EditKhachHangTitle">
                    Cập nhật khách hàng
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <form id="registerFormAKH">
                    <div class="form-floating">
                      <input
                        type="text"
                        class="form-control"
                        v-model="selectedKhachHang.HoTenKH"
                        id="registerInputUsernameEKH"
                        @focus="buttonDisabled = false"
                        placeholder=""
                        required
                      />
                      <label for="registerInputUsernameEKH"
                        >Họ tên khách hàng</label
                      >
                    </div>

                    <div class="form-floating">
                      <input
                        type="text"
                        class="form-control"
                        v-model="selectedKhachHang.DiaChi"
                        id="registerInputDiaChiEKH"
                        @focus="buttonDisabled = false"
                        placeholder=""
                        required
                      />
                      <label for="registerInputDiaChiEKH">Địa chỉ</label>
                    </div>

                    <div class="form-floating">
                      <input
                        type="text"
                        class="form-control"
                        v-model="selectedKhachHang.SoDienThoai"
                        id="registerInputSoDienThoaiEKH"
                        @focus="buttonDisabled = false"
                        placeholder=""
                        required
                      />
                      <label for="registerInputSoDienThoaiEKH"
                        >Số điện thoại</label
                      >
                    </div>

                    <div class="form-floating">
                      <input
                        type="password"
                        class="form-control"
                        v-model="selectedKhachHang.Password"
                        id="registerInputPasswordEKH"
                        @focus="buttonDisabled = false"
                        placeholder=""
                        required
                      />
                      <label for="registerInputPasswordEKH">Mật khẩu</label>
                    </div>

                    <div
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 10px 0 0 0;
                      "
                    >
                      <button
                        type="button"
                        id="registerButtonEKH"
                        class="btn btn-danger registerForm-button"
                        @click="EditKhachHang"
                        :disabled="buttonDisabled"
                      >
                        Cập nhật khách hàng
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade"
            id="registerModal"
            tabindex="-1"
            aria-labelledby="registerModalLabel"
            aria-hidden="true"
            data-backdrop="false"
          >
            <div class="modal-dialog-centered modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="loginTitle">Thêm khách hàng</h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <form id="registerForm">
                    <div class="form-floating">
                      <input
                        type="text"
                        class="form-control"
                        v-model="khachHangReq.HoTenKH"
                        id="registerInputUsername"
                        @focus="buttonDisabled = false"
                        placeholder=""
                        required
                      />
                      <label for="registerInputUsername">Họ tên KH</label>
                    </div>

                    <div class="form-floating">
                      <input
                        type="text"
                        class="form-control"
                        v-model="khachHangReq.DiaChi"
                        id="registerInputDiaChi"
                        @focus="buttonDisabled = false"
                        placeholder=""
                        required
                      />
                      <label for="registerInputDiaChi">Địa chỉ</label>
                    </div>

                    <div class="form-floating">
                      <input
                        type="text"
                        class="form-control"
                        v-model="khachHangReq.SoDienThoai"
                        id="registerInputSoDienThoai"
                        @focus="buttonDisabled = false"
                        placeholder=""
                        required
                      />
                      <label for="registerInputSoDienThoai"
                        >Số điện thoại</label
                      >
                    </div>

                    <div class="form-floating">
                      <input
                        type="password"
                        class="form-control"
                        v-model="khachHangReq.Password"
                        id="registerInputPassword"
                        @focus="buttonDisabled = false"
                        placeholder=""
                        required
                      />
                      <label for="registerInputPassword">Mật khẩu</label>
                    </div>

                    <div
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 10px 0 0 0;
                      "
                    >
                      <button
                        type="button"
                        id="registerButton"
                        class="btn btn-danger registerForm-button"
                        @click="AddKhachHang"
                        :disabled="buttonDisabled"
                      >
                        Thêm khách hàng
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="nhanvien != null && nhanvien.ChucVu == 'Quản lý'"
        class="card"
        style="width: 100%; height: 100%; margin-top: 30px; margin-right: 30px"
      >
        <div class="card-body" style="border-radius: 15px">
          <h5>Thông tin tất cả nhân viên</h5>
          <div class="input-group rounded" id="homePage-search-bar">
            <input
              type="search"
              id="search-bar"
              class="form-control rounded"
              v-model="searchNhanVien"
              placeholder="Tìm kiếm nhân viên"
              aria-label="Search"
              aria-describedby="search-addon"
            />
          </div>
          <ul class="list-group" v-for="nhanvien in filteredNhanViens">
            <li
              class="list-group-item align-items-center"
              style="display: flex; justify-content: space-between"
            >
              <div style="display: flex">
                <div>
                  <div>
                    Họ tên:
                    <span style="font-weight: bold">{{
                      nhanvien.HoTenNV
                    }}</span>
                  </div>
                  <div>
                    Tài khoản: <span>{{ nhanvien.MSNV }}</span>
                  </div>
                  <div>
                    Mật khẩu: <span>{{ nhanvien.Password }}</span>
                  </div>
                  <div>
                    Địa chỉ: <span>{{ nhanvien.DiaChi }}</span>
                  </div>
                  <div>
                    Số điện thoại: <span>{{ nhanvien.SoDienThoai }}</span>
                  </div>
                  <div>
                    Chức vụ: <span>{{ nhanvien.ChucVu }}</span>
                  </div>
                </div>
              </div>
              <div style="display: flex; flex-direction: column">
                <button
                  class="btn btn-light"
                  @click="confirmRemoveNhanVien(nhanvien.MSNV)"
                >
                  <font-awesome-icon icon="trash" />
                </button>

                <button
                  class="btn btn-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#EditNhanVien"
                  @click="selectedNhanVien = nhanvien"
                >
                  <font-awesome-icon
                    icon="pen-to-square"
                    style="cursor: pointer"
                  />
                </button>
              </div>
            </li>
          </ul>
          <button
            class="btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#AddNhanvien"
            style="width: 100%"
          >
            +
          </button>

          <div
            class="modal fade"
            id="AddNhanvien"
            tabindex="-1"
            aria-labelledby="AddNhanvienLabel"
            aria-hidden="true"
            data-backdrop="false"
          >
            <div class="modal-dialog-centered modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="AddNhanvienTitle">
                    Thêm nhân viên
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <form id="registerFormANV">
                    <div class="form-floating">
                      <input
                        type="text"
                        class="form-control"
                        v-model="NhanVienReq.HoTenNV"
                        id="registerInputUsernameNV"
                        @focus="buttonDisabled = false"
                        placeholder=""
                        required
                      />
                      <label for="registerInputUsernameNV"
                        >Họ tên nhân viên</label
                      >
                    </div>

                    <div class="form-floating">
                      <input
                        type="text"
                        class="form-control"
                        v-model="NhanVienReq.DiaChi"
                        id="registerInputDiaChiNV"
                        @focus="buttonDisabled = false"
                        placeholder=""
                        required
                      />
                      <label for="registerInputDiaChiNV">Địa chỉ</label>
                    </div>

                    <div class="form-floating">
                      <input
                        type="text"
                        class="form-control"
                        v-model="NhanVienReq.SoDienThoai"
                        id="registerInputSoDienThoaiNV"
                        @focus="buttonDisabled = false"
                        placeholder=""
                        required
                      />
                      <label for="registerInputSoDienThoaiNV"
                        >Số điện thoại</label
                      >
                    </div>

                    <div class="form-floating">
                      <input
                        type="password"
                        class="form-control"
                        v-model="NhanVienReq.Password"
                        id="registerInputPasswordNV"
                        @focus="buttonDisabled = false"
                        placeholder=""
                        required
                      />
                      <label for="registerInputPasswordNV">Mật khẩu</label>
                    </div>

                    <div class="form-floating">
                      <select
                        style="margin-bottom: 20px"
                        id="selectChucVu"
                        v-model="NhanVienReq.ChucVu"
                        class="form-select"
                        aria-label="Default select example"
                        required
                      >
                        <option v-for="cv in ChucVus" :value="cv">
                          {{ cv }}
                        </option>
                      </select>
                      <label for="selectChucVu">Chức vụ</label>
                    </div>

                    <div
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 10px 0 0 0;
                      "
                    >
                      <button
                        type="button"
                        id="registerButtonNV"
                        class="btn btn-warning registerForm-button"
                        @click="AddNhanVien"
                        :disabled="buttonDisabled"
                      >
                        Thêm nhân viên
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade"
            id="EditNhanVien"
            tabindex="-1"
            aria-labelledby="EditNhanVienLabel"
            aria-hidden="true"
            data-backdrop="false"
          >
            <div class="modal-dialog-centered modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="EditNhanVienTitle">
                    Cập nhật nhân viên
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <form id="registerFormNV">
                    <div class="form-floating">
                      <input
                        type="text"
                        class="form-control"
                        v-model="selectedNhanVien.HoTenNV"
                        id="registerInputUsernameENV"
                        @focus="buttonDisabled = false"
                        placeholder=""
                        required
                      />
                      <label for="registerInputUsernameENV"
                        >Họ tên nhân viên</label
                      >
                    </div>

                    <div class="form-floating">
                      <input
                        type="text"
                        class="form-control"
                        v-model="selectedNhanVien.DiaChi"
                        id="registerInputDiaChiENV"
                        @focus="buttonDisabled = false"
                        placeholder=""
                        required
                      />
                      <label for="registerInputDiaChiENV">Địa chỉ</label>
                    </div>

                    <div class="form-floating">
                      <input
                        type="text"
                        class="form-control"
                        v-model="selectedNhanVien.SoDienThoai"
                        id="registerInputSoDienThoaiENV"
                        @focus="buttonDisabled = false"
                        placeholder=""
                        required
                      />
                      <label for="registerInputSoDienThoaiENV"
                        >Số điện thoại</label
                      >
                    </div>

                    <div class="form-floating">
                      <input
                        type="password"
                        class="form-control"
                        v-model="selectedNhanVien.Password"
                        id="registerInputPasswordENV"
                        @focus="buttonDisabled = false"
                        placeholder=""
                        required
                      />
                      <label for="registerInputPasswordENV">Mật khẩu</label>
                    </div>

                    <div class="form-floating">
                      <select
                        style="margin-bottom: 20px"
                        id="selectChucVuE"
                        v-model="selectedNhanVien.ChucVu"
                        class="form-select"
                        aria-label="Default select example"
                        required
                      >
                        <option v-for="cv in ChucVus" :value="cv">
                          {{ cv }}
                        </option>
                      </select>
                      <label for="selectChucVu">Chức vụ</label>
                    </div>

                    <div
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 10px 0 0 0;
                      "
                    >
                      <button
                        type="button"
                        id="registerButtonENV"
                        class="btn btn-warning registerForm-button"
                        @click="EditNhanVien"
                        :disabled="buttonDisabled"
                      >
                        Cập nhật nhân viên
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card" style="border: 0px; width: 50%; margin-top: 30px">
      <div class="card-body">
        <h5>Thông tin tất cả đơn đặt hàng</h5>
        <input
          type="search"
          id="search-bar"
          class="form-control rounded"
          v-model="searchChiTietDatHang"
          placeholder="Tìm kiếm đơn đặt hàng theo số đơn"
          aria-label="Search"
          aria-describedby="search-addon"
        />
        <button
          class="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#registerDatHangModal"
          style="width: 100%"
          :disabled="khachhangs.length == 0"
        >
          Thêm đặt hàng
        </button>
        <ul class="list-group" v-for="ctdh in filteredChiTietDatHangs">
          <li
            class="list-group-item align-items-center"
            style="display: flex; justify-content: space-between"
          >
            <div style="display: flex">
              <div v-if="ctdh != null && dathangs.get(ctdh.SoDonDH) != null">
                <div>
                  Số đơn đặt hàng: <span>{{ ctdh.SoDonDH }}</span>
                </div>
                <div>
                  Mã số hàng hóa: <span>{{ ctdh.MSHH }}</span>
                </div>
                <div>
                  Số lượng: <span>{{ ctdh.SoLuong }}</span>
                </div>
                <div>
                  Giá đặt hàng: <span>{{ ctdh.GiaDatHang }}</span>
                </div>
                <div>
                  Giảm giá: <span>{{ ctdh.GiamGia }}</span>
                </div>
                <div>
                  Mã số khách hàng:
                  <span>{{ dathangs.get(ctdh.SoDonDH).MSKH }}</span>
                </div>
                <div>
                  Mã số nhân viên:
                  <span>{{ dathangs.get(ctdh.SoDonDH).MSNV }}</span>
                </div>
                <div>
                  Ngày đặt hàng:
                  <span>{{ dathangs.get(ctdh.SoDonDH).NgayDH }}</span>
                </div>
                <div>
                  Ngày đặt hàng:
                  <span>{{ dathangs.get(ctdh.SoDonDH).NgayGH }}</span>
                </div>
                <div>
                  Trạng thái đơn hàng:
                  <span>{{ dathangs.get(ctdh.SoDonDH).TrangThaiDH }}</span>
                </div>
              </div>
            </div>
            <div style="display: flex; flex-direction: column">
              <button
                class="btn btn-light"
                style="margin-bottom: 20px"
                @click="confirmRemoveChiTietDatHang(ctdh.SoDonDH, ctdh.MSHH)"
              >
                <font-awesome-icon icon="trash" />
              </button>

              <button
                class="btn btn-dark"
                @click="selectedDathang = dathangs.get(ctdh.SoDonDH)"
                data-bs-toggle="modal"
                data-bs-target="#EditDatHang"
              >
                <font-awesome-icon icon="pen-to-square" />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="modal fade"
      id="registerDatHangModal"
      tabindex="-1"
      aria-labelledby="registerDatHangModalLabel"
      aria-hidden="true"
      data-backdrop="false"
    >
      <div class="modal-dialog-centered modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="loginTitle1">Thêm đặt hàng</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form id="registerForm1">
              <div class="form-floating">
                <select
                  style="margin-bottom: 20px"
                  id="selectKhachHang"
                  v-model="datHangReq.MSKH"
                  class="form-select"
                  aria-label="Default select example"
                  required
                >
                  <option
                    v-for="khachhang in khachhangs"
                    :value="khachhang.MSKH"
                  >
                    {{ khachhang.MSKH }} - {{ khachhang.HoTenKH }}
                  </option>
                </select>
                <label for="selectKhachHang">Mã số khách hàng</label>
              </div>
              <div class="form-floating">
                <input
                  type="date"
                  class="form-control"
                  v-model="datHangReq.NgayDH"
                  id="registerInputDiaChi1"
                  @focus="buttonDisabled = false"
                  placeholder=""
                  required
                />
                <label for="registerInputDiaChi1">Ngày đặt hàng</label>
              </div>

              <div class="form-floating">
                <input
                  type="date"
                  class="form-control"
                  v-model="datHangReq.NgayGH"
                  id="registerInputSoDienThoai1"
                  @focus="buttonDisabled = false"
                  placeholder=""
                  required
                />
                <label for="registerInputSoDienThoai1">Ngày giao hàng</label>
              </div>

              <div class="form-floating">
                <input
                  type="number"
                  class="form-control"
                  v-model="ctdhReq.SoLuong"
                  id="registerInputSoLuong"
                  @focus="buttonDisabled = false"
                  placeholder=""
                  required
                />
                <label for="registerInputSoLuong">Số lượng</label>
              </div>

              <div class="form-floating">
                <input
                  type="number"
                  class="form-control"
                  v-model="ctdhReq.GiaDatHang"
                  id="registerInputGia"
                  @focus="buttonDisabled = false"
                  placeholder=""
                  required
                />
                <label for="registerInputGia">Giá đặt hàng</label>
              </div>

              <div class="form-floating">
                <input
                  type="number"
                  class="form-control"
                  v-model="ctdhReq.GiamGia"
                  id="registerInputGiamGia"
                  @focus="buttonDisabled = false"
                  placeholder=""
                  required
                />
                <label for="registerInputGiamGia">Giảm giá</label>
              </div>

              <div class="form-floating">
                <select
                  style="margin-bottom: 20px"
                  id="selectMSHH"
                  v-model="ctdhReq.MSHH"
                  class="form-select"
                  aria-label="Default select example"
                  required
                >
                  <option v-for="hh in hanghoas" :value="hh.MSHH">
                    {{ hh.MSHH }} - {{ hh.TenHangHoa }}
                  </option>
                </select>
                <label for="selectMSHH">Mã số hàng hóa</label>
              </div>

              <div class="form-floating">
                <select
                  style="margin-bottom: 20px"
                  id="selectTrangThai"
                  v-model="datHangReq.TrangThaiDH"
                  class="form-select"
                  aria-label="Default select example"
                  required
                >
                  <option v-for="tt in TTDH" :value="tt">{{ tt }}</option>
                </select>
                <label for="selectTrangThai">Trạng thái đơn hàng</label>
              </div>

              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 10px 0 0 0;
                "
              >
                <button
                  type="button"
                  id="registerDatHangButton"
                  class="btn btn-success registerForm-button"
                  @click="AddDatHang"
                  :disabled="buttonDisabled"
                >
                  Thêm đơn đặt hàng
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="EditDatHang"
    tabindex="-1"
    aria-labelledby="EditDatHangLabel"
    aria-hidden="true"
    data-backdrop="false"
  >
    <div class="modal-dialog-centered modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="EditDatHangTitle">Cập nhật đặt hàng</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form id="registerFormDH">
            <div class="form-floating">
              <input
                type="date"
                class="form-control"
                v-model="selectedDathang.NgayGH"
                id="registerInputUsernameEDH"
                @focus="buttonDisabled = false"
                placeholder=""
                required
              />
              <label for="registerInputUsernameEDH">Ngày giao hàng</label>
            </div>

            <div class="form-floating">
              <select
                style="margin-bottom: 20px"
                id="selectTrangThaiEdit"
                v-model="selectedDathang.TrangThaiDH"
                class="form-select"
                aria-label="Default select example"
                required
              >
                <option v-for="tt in TTDH" :value="tt">{{ tt }}</option>
              </select>
              <label for="selectTrangThaiEdit">Trạng thái đơn hàng</label>
            </div>

            <div
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10px 0 0 0;
              "
            >
              <button
                type="button"
                id="registerButtonEDH"
                class="btn btn-success registerForm-button"
                @click="EditDatHang"
                :disabled="buttonDisabled"
              >
                Cập nhật đặt hàng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chiTietDatHangService from "@/services/chitietdathang.service";
import khachHangService from "@/services/khachhang.service";
import datHangService from "@/services/dathang.service";
import nhanVienService from "@/services/nhanvien.service";
import hangHoaService from "@/services/hanghoa.service";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      selectedDathang: {},
      selectedKhachHang: {},
      selectedNhanVien: {},
      buttonDisabled: false,
      khachhangs: [],
      dathangs: new Map(),
      ctdhs: [],
      nhanviens: [],
      nhanvien: {},
      hanghoas: [],
      datHangReq: {
        SoDonDH: Math.ceil(Math.random() * 99999),
        MSKH: 0,
        MSNV: 0,
        NgayDH: new Date(),
        NgayGH: new Date(),
        TrangThaiDH: "Đã đặt",
      },
      ctdhReq: {
        SoDonDH: 0,
        MSHH: 0,
        SoLuong: 0,
        GiaDatHang: 0,
        GiamGia: 0,
      },
      khachHangReq: {
        MSKH: Math.ceil(Math.random() * 99999),
        HoTenKH: "",
        Password: "",
        DiaChi: "",
        SoDienThoai: "",
      },
      NhanVienReq: {
        MSNV: Math.ceil(Math.random() * 99999),
        HoTenNV: "",
        Password: "",
        DiaChi: "",
        SoDienThoai: "",
        ChucVu: "",
      },
      TTDH: ["Đã đặt", "Đã giao", "Đã hủy"],
      ChucVus: ["Nhân viên", "Quản lý"],
      searchKhachHang: "",
      searchChiTietDatHang: "",
      searchNhanVien: "",
    };
  },
  components: {},
  computed: {
    filteredKhachHangs() {
      return this.khachhangs.filter((p) => {
        return (
          p.HoTenKH.toLowerCase().indexOf(this.searchKhachHang.toLowerCase()) !=
          -1
        );
      });
    },
    filteredChiTietDatHangs() {
      return this.ctdhs.filter((p) => {
        return (
          p.SoDonDH.toString()
            .toLowerCase()
            .indexOf(this.searchChiTietDatHang.toLowerCase()) != -1
        );
      });
    },
    filteredNhanViens() {
      return this.nhanviens.filter((p) => {
        return (
          p.HoTenNV.toLowerCase().indexOf(this.searchNhanVien.toLowerCase()) !=
            -1 && p.MSNV != this.nhanvien.MSNV
        );
      });
    },
  },
  methods: {
    async checkLogin() {
      try {
        var msnv = this.$cookies.get("MSNV");
        this.nhanvien = await nhanVienService.getOne(msnv);
        if (this.nhanvien.Password < 0) throw new Error(this.nhanvien.Password);
      } catch (error) {
        this.$router.push({ name: "login" });
      }
    },
    confirmRemoveKhachHang(id) {
      Swal.fire({
        title: "Bạn có chắc chắn muốn xóa khách hàng này không",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Hủy",
        denyButtonText: `Xóa`,
      }).then((result) => {
        if (result.isConfirmed) {
          //revert 2 case for color
          Swal.fire("Đã hủy thao tác", "", "info");
        } else if (result.isDenied) {
          this.removeKhachHang(id);
        }
      });
    },
    confirmRemoveNhanVien(id) {
      Swal.fire({
        title: "Bạn có chắc chắn muốn xóa nhân viên này không",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Hủy",
        denyButtonText: `Xóa`,
      }).then((result) => {
        if (result.isConfirmed) {
          //revert 2 case for color
          Swal.fire("Đã hủy thao tác", "", "info");
        } else if (result.isDenied) {
          this.removeNhanVien(id);
        }
      });
    },
    confirmRemoveChiTietDatHang(id, mshh) {
      Swal.fire({
        title: "Bạn có chắc chắn muốn xóa đơn hàng này không",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Hủy",
        denyButtonText: `Xóa`,
      }).then((result) => {
        if (result.isConfirmed) {
          //revert 2 case for color
          Swal.fire("Đã hủy thao tác", "", "info");
        } else if (result.isDenied) {
          this.removeDatHang(id, mshh);
        }
      });
    },
    async removeDatHang(id, mshh) {
      try {
        await chiTietDatHangService.delete(id, mshh);
        await datHangService.delete(id);
        this.displaySuccess("Xóa đơn hàng thành công");
        await this.sleep(1000);
        this.$router.go();
      } catch (error) {
        console.log(error);
        this.displayError(error);
      }
    },
    async removeNhanVien(id) {
      try {
        await nhanVienService.delete(id);
        this.displaySuccess("Xóa nhân viên thành công");
        await this.sleep(1000);
        this.$router.go();
      } catch (error) {
        console.log(error);
        this.displayError(error);
      }
    },
    async removeKhachHang(id) {
      try {
        await khachHangService.delete(id);
        this.displaySuccess("Xóa khách hàng thành công");
        await this.sleep(1000);
        this.$router.go();
      } catch (error) {
        console.log(error);
        this.displayError(error);
      }
    },
    async AddKhachHang() {
      try {
        await khachHangService.create(this.khachHangReq);
        this.displaySuccess("Tạo khách hàng thành công");
        await this.sleep(1000);
        this.$router.go();
      } catch (error) {
        console.log(error);
        this.displayError(error);
      }
    },
    async EditKhachHang() {
      try {
        await khachHangService.update(
          this.selectedKhachHang,
          this.selectedKhachHang.MSKH
        );
        this.displaySuccess("Cập nhật khách hàng thành công");
        await this.sleep(1000);
        this.$router.go();
      } catch (error) {
        console.log(error);
        this.displayError(error);
      }
    },
    async AddNhanVien() {
      try {
        await nhanVienService.create(this.NhanVienReq);
        this.displaySuccess("Tạo nhân viên thành công");
        await this.sleep(1000);
        this.$router.go();
      } catch (error) {
        console.log(error);
        this.displayError(error);
      }
    },
    async EditNhanVien() {
      try {
        await nhanVienService.update(
          this.selectedNhanVien,
          this.selectedNhanVien.MSNV
        );
        this.displaySuccess("Cập nhật nhân viên thành công");
        await this.sleep(1000);
        this.$router.go();
      } catch (error) {
        console.log(error);
        this.displayError(error);
      }
    },
    async AddDatHang() {
      try {
        if (this.datHangReq.NgayDH > this.datHangReq.NgayGH)
          throw new Error("Ngày giao hàng phải lớn hơn ngày đặt hàng");
        this.datHangReq.NgayGH = this.datHangReq.NgayGH.slice(0, 10);
        this.datHangReq.NgayDH = this.datHangReq.NgayDH.slice(0, 10);
        let hanghoa = await hangHoaService.getOne(this.ctdhReq.MSHH);
        console.log(hanghoa);
        if (hanghoa.SoLuongHang < this.ctdhReq.SoLuong)
          throw new Error(
            "Số lượng hàng hóa đặt phải nhỏ hơn hoặc bằng số lượng hàng hóa trong kho"
          );

        this.datHangReq.MSNV = this.nhanvien.MSNV;
        await datHangService.create(this.datHangReq);

        this.ctdhReq.SoDonDH = this.datHangReq.SoDonDH;
        await chiTietDatHangService.create(this.ctdhReq);

        this.displaySuccess("Tạo đơn đặt hàng thành công");
        await this.sleep(1000);
        this.$router.go();
      } catch (error) {
        console.log(error);
        this.displayError(error);
      }
    },
    async EditDatHang() {
      try {
        if (this.selectedDathang.NgayDH > this.selectedDathang.NgayGH)
          throw new Error("Ngày giao hàng phải lớn hơn ngày đặt hàng");
        this.selectedDathang.NgayGH = this.selectedDathang.NgayGH.slice(0, 10);
        await datHangService.update(
          this.selectedDathang,
          this.selectedDathang.SoDonDH
        );
        this.displaySuccess("Cập nhật đặt hàng thành công");
        await this.sleep(1000);
        this.$router.go();
      } catch (error) {
        console.log(error);
        this.displayError(error);
      }
    },
    async getAllNhanVien() {
      try {
        this.nhanviens = await nhanVienService.getAll();
      } catch (err) {
        console.log(err);
        this.displayError(err);
      }
    },
    async getAllDatHang() {
      try {
        this.ctdhs = await chiTietDatHangService.getAll();
        this.ctdhs.forEach(async (element) => {
          let dathang = await datHangService.getOne(element.SoDonDH);
          this.dathangs.set(element.SoDonDH, dathang);
        });
      } catch (err) {
        console.log(err);
        this.displayError(err);
      }
    },
    async getAllKhachHang() {
      try {
        this.khachhangs = await khachHangService.getAll();
        if (this.khachhangs.length > 0)
          this.datHangReq.MSKH = this.khachhangs[0].MSKH;
      } catch (err) {
        console.log(err);
        this.displayError(err);
      }
    },
    async getAllHangHoa() {
      try {
        this.hanghoas = await hangHoaService.getAll();
      } catch (err) {
        console.log(err);
        this.displayError(err);
      }
    },
    showHeaderAndFooter() {
      this.$emit("isShowHeaderAndFooter", true);
    },
    displaySuccess(message) {
      Swal.fire({
        // position: 'top-end',
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
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
  mounted() {
    this.showHeaderAndFooter();
    this.checkLogin();
    this.getAllNhanVien();
    this.getAllKhachHang();
    this.getAllDatHang();
    this.getAllHangHoa();
  },
};
</script>

<style>
.form-control {
  margin-bottom: 15px;
}

#search-bar {
  border-radius: 50%;
}

#AppHeader {
  position: static;
  background-color: #0f2c59;
}
</style>
