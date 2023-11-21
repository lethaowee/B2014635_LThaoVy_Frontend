<template>
    <form id="registerForm" style="margin: auto; width: 100%; ">
        <h4 style="text-align: center; margin-top: 10px;">Thêm hàng hóa</h4>
        <div class="form-floating static">
            <input type="text" class="form-control" v-model="hangHoaReq.TenHangHoa" id="registerInputUsername"
                @focus="buttonDisabled = false" placeholder="" required>
            <label for="registerInputUsername">Tên hàng hóa</label>
        </div>

        <div class="form-floating static">
            <textarea class="form-control" v-model="hangHoaReq.MoTaHH" id="registerInputPassword"
                @focus="buttonDisabled = false" placeholder="" style="height: 200px;" required></textarea>
            <label for="registerInputPassword">Mô tả hàng hóa</label>
        </div>
        <div class="form-floating static">
            <input type="number" class="form-control" v-model="hangHoaReq.Gia" id="registerInputDiaChi"
                @focus="buttonDisabled = false" placeholder="" required>
            <label for="registerInputDiaChi">Giá hàng hóa</label>
        </div>

        <div class="form-floating static">
            <input type="number" class="form-control" v-model="hangHoaReq.SoLuongHang" id="registerInputSoDienThoai"
                @focus="buttonDisabled = false" placeholder="" required>
            <label for="registerInputSoDienThoai">Số lượng hàng</label>
        </div>

        <div class="form-floating static">
            <input type="text" class="form-control" v-model="hangHoaReq.GhiChu" id="registerInputSoDienThoai"
                @focus="buttonDisabled = false" placeholder="" required>
            <label for="registerInputSoDienThoai">Ghi chú</label>
        </div>

        <div class="form-floating static">
            <input type="file" accept="image/jpeg/*" @change="uploadImage()" class="form-control" id="registerInputUsername"
                @focus="buttonDisabled = false" placeholder="" required>
            <label for="registerInputUsername">Hình ảnh</label>
        </div>

        <div style="display:flex; align-items:center; justify-content: center; padding: 10px 0 0 0;">
            <button type="button" id="registerButton" class="btn btn-warning registerForm-button" @click="AddHangHoa"
                :disabled="buttonDisabled"> Thêm hàng hóa</button>
        </div>
    </form>




    <div id="UserHomePage-listRoom">
        <input type="search" style="width: 70%; margin: auto; margin-top: 20px; margin-bottom: 20px;" id="search-bar"
            class="form-control rounded" v-model="searchHangHoa" placeholder="Tìm kiếm hàng hóa" aria-label="Search"
            aria-describedby="search-addon" />

        <ul id="HangHoaCard-ul">
            <li v-for="hanghoa in filteredHangHoas">
                <div class="card" style="width: 18rem; height: 25rem;">
                    <div style="height: 200px; width: auto; text-align: center;">
                        <img v-if="rawImg.get(hanghoa.MSHH) != null" :src="rawImg.get(hanghoa.MSHH).TenHinh"
                            style="height: 200px; width: 200px;" class="card-img-top"
                            @click="selectedHinhHangHoa = rawImg.get(hanghoa.MSHH)" alt="Card image cap"
                            data-bs-toggle="modal" data-bs-target="#EditHinhHangHoa">
                    </div>
                    <div class="card-body">
                        <div style="display: flex; justify-content: space-between;">
                            <div>
                                <h5 class="card-title">{{ hanghoa.TenHangHoa }}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">Mã số hàng hóa: {{ hanghoa.MSHH }}</h6>
                            </div>
                            <button class="btn btn-light" style="margin-bottom: 20px;"
                                @click="confirmRemoveHangHoa(hanghoa.MSHH)">
                                <font-awesome-icon icon="trash" style="cursor: pointer" />
                            </button>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <p class="card-text overflow-auto" style="overflow-y: scroll;">{{ hanghoa.MoTaHH }}</p>
                            <button class="btn btn-dark" style="margin-bottom: 20px;" @click="selectedHangHoa = hanghoa"
                                data-bs-toggle="modal" data-bs-target="#EditHangHoa">
                                <font-awesome-icon icon="pen-to-square" />
                            </button>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Giá tiền: <span style="color: red;">
                                    {{ hanghoa.Gia.toLocaleString('vi', {
                                        style: 'currency', currency:
                                            'VND'
                                    }) }}
                                </span>
                            </span>
                            <span>Số lượng: <span> {{ hanghoa.SoLuongHang }} </span>
                            </span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>

    </div>

    <div class="modal fade" id="EditHangHoa" tabindex="-1" aria-labelledby="EditHangHoaLabel" aria-hidden="true"
        data-backdrop="false">
        <div class="modal-dialog-centered modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="EditHangHoaTitle">Cập nhật hàng hóa</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="registerFormHH">

                        <div class="form-floating">
                            <input type="text" class="form-control" v-model="selectedHangHoa.TenHangHoa"
                                id="registerInputUsernameEHH" @focus="buttonDisabled = false" placeholder="" required>
                            <label for="registerInputUsernameEHH">Tên hàng hóa</label>
                        </div>

                        <div class="form-floating">
                            <textarea style="height: 200px;" class="form-control" v-model="selectedHangHoa.MoTaHH"
                                id="registerInputDiaChiEKH" @focus="buttonDisabled = false" placeholder=""
                                required>{{ selectedHangHoa.MoTaHH }}</textarea>
                            <label for="registerInputDiaChiEKH">Mô tả hàng hóa</label>
                        </div>

                        <div class="form-floating">
                            <input type="number" class="form-control" v-model="selectedHangHoa.Gia"
                                id="registerInputSoDienThoaiEHH" @focus="buttonDisabled = false" placeholder="" required>
                            <label for="registerInputSoDienThoaiEHH">Giá</label>
                        </div>

                        <div class="form-floating">
                            <input type="number" class="form-control" v-model="selectedHangHoa.SoLuongHang"
                                id="registerInputPasswordEHH" @focus="buttonDisabled = false" placeholder="" required>
                            <label for="registerInputPasswordEHH">Số lượng hàng</label>
                        </div>

                        <div class="form-floating">
                            <input type="text" class="form-control" v-model="selectedHangHoa.GhiChu"
                                id="registerInputSoDienThoaiEHH" @focus="buttonDisabled = false" placeholder="" required>
                            <label for="registerInputSoDienThoaiEHH">Ghi chú</label>
                        </div>

                        <div style="display:flex; align-items:center; justify-content: center; padding: 10px 0 0 0;">
                            <button type="button" id="registerButtonEHH" class="btn btn-warning registerForm-button"
                                @click="EditHangHoa" :disabled="buttonDisabled"> Cập nhật hàng hóa </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="EditHinhHangHoa" tabindex="-1" aria-labelledby="EditHinhHangHoaLabel" aria-hidden="true"
        data-backdrop="false">
        <div class="modal-dialog-centered modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="EditHinhHangHoaTitle">Cập nhật hình hàng hóa</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="registerFormHHH">

                        <div class="form-floating">
                            <input type="file" accept="image/jpeg/*" @change="uploadImage1()" class="form-control"
                                id="registerInputUsernameHHH" @focus="buttonDisabled = false" placeholder="" required>
                            <label for="registerInputUsernameHHH">Hình ảnh</label>
                        </div>

                        <div style="display:flex; align-items:center; justify-content: center; padding: 10px 0 0 0;">
                            <button type="button" id="registerButtonEHHH" class="btn btn-warning registerForm-button"
                                @click="EditHinhHangHoa" :disabled="buttonDisabled"> Cập nhật hình hàng hóa </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import chiTietDatHangService from '@/services/chitietdathang.service';
import hinhHangHoaService from '@/services/hinhhanghoa.service'
import nhanVienService from '@/services/nhanvien.service'
import datHangService from '@/services/dathang.service';
import hangHoaService from '@/services/hanghoa.service'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            hanghoas: [],
            selectedHangHoa: {},
            selectedHinhHangHoa: {},
            hangHoaReq: {
                "MSHH": Math.ceil(Math.random() * 99999),
                "TenHangHoa": "",
                "MoTaHH": "",
                "Gia": "",
                "SoLuongHang": "",
                "GhiChu": "",
            },
            hinhHangHoaReq: {
                "MaHinh": Math.ceil(Math.random() * 99999),
                "MSHH": 0,
                "TenHinh": "",
            },
            searchHangHoa: "",
            rawImg: new Map(),
            result: "",
        }
    },
    components: {
    },
    computed: {
        filteredHangHoas() {
            return this.hanghoas.filter(p => {
                return p.TenHangHoa.toLowerCase().indexOf(this.searchHangHoa.toLowerCase()) != -1;
            });
        },
    },
    methods: {
        uploadImage() {
            const file = document.querySelector('input[type=file]').files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                this.result = reader.result;
            }
            reader.readAsDataURL(file);
        },
        uploadImage1() {
            const file = document.querySelector('#registerInputUsernameHHH').files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                this.result = reader.result;
            }
            reader.readAsDataURL(file);
        },
        async getHinhHangHoa(MSHH) {
            try {
                let hinh = await hinhHangHoaService.getAllByMSHH(MSHH)
                return hinh[0]
            } catch (error) {
                return null
            }
        },
        async checkLogin() {
            try {
                var msnv = this.$cookies.get("MSNV");
                this.nhanvien = await nhanVienService.getOne(msnv);
                if (this.nhanvien.Password < 0) throw new Error(this.nhanvien.Password)
            } catch (error) {
                this.$router.push({ name: "login" });
            }
        },
        async getAllHangHoa() {
            try {
                this.hanghoas = await hangHoaService.getAll();
                this.hanghoas.forEach(async (hanghoa) => {
                    var img = await this.getHinhHangHoa(hanghoa.MSHH)
                    this.rawImg.set(hanghoa.MSHH, img)
                })
            } catch (err) {
                console.log(err)
                this.displayError(err)
            }
        },
        async AddHangHoa() {
            try {
                await hangHoaService.create(this.hangHoaReq)
                this.hinhHangHoaReq.MSHH = this.hangHoaReq.MSHH
                this.hinhHangHoaReq.TenHinh = this.result
                await hinhHangHoaService.create(this.hinhHangHoaReq)
                this.displaySuccess("Thêm hàng hóa thành công")
                await this.sleep(1000)
                this.$router.go()
            } catch (err) {
                console.log(err)
                this.displayError(err)
            }
        },
        async EditHangHoa() {
            try {
                await hangHoaService.update(this.selectedHangHoa, this.selectedHangHoa.MSHH)
                this.displaySuccess("Cập nhật hàng hóa thành công")
                await this.sleep(1000)
                this.$router.go()
            } catch (error) {
                console.log(error)
                this.displayError(error)
            }
        },
        async EditHinhHangHoa() {
            try {
                this.selectedHinhHangHoa.TenHinh = this.result
                await hinhHangHoaService.update(this.selectedHinhHangHoa, this.selectedHinhHangHoa.MaHinh)
                this.displaySuccess("Cập nhật hình hàng hóa thành công")
                await this.sleep(1000)
                this.$router.go()
            } catch (error) {
                console.log(error)
                this.displayError(error)
            }
        },
        async removeHangHoa(id) {
            try {
                await chiTietDatHangService.deleteByMSHH(id)
                await hinhHangHoaService.deleteByMSHH(id)
                await hangHoaService.delete(id)
                this.displaySuccess("Xóa hàng hóa và hình hàng hóa thành công")
                await this.sleep(1000)
                this.$router.go()
            } catch (error) {
                console.log(error)
                this.displayError(error)
            }
        },
        confirmRemoveHangHoa(id) {
            Swal.fire({
                title: 'Bạn có chắc chắn muốn xóa hàng hóa này không',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Hủy',
                denyButtonText: `Xóa`,
            }).then((result) => {
                if (result.isConfirmed) { //revert 2 case for color
                    Swal.fire('Đã hủy thao tác', '', 'info')
                } else if (result.isDenied) {
                    this.removeHangHoa(id);
                }
            })
        },

        showHeaderAndFooter() {
            this.$emit("isShowHeaderAndFooter", true);
        },
        displaySuccess(message) {
            Swal.fire({
                icon: 'success',
                title: message,
                showConfirmButton: false,
                timer: 1000
            })
        },
        displayError(message) {
            Swal.fire({
                title: 'Lỗi!',
                text: message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        },
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
    },
    mounted() {
        this.showHeaderAndFooter();
        this.checkLogin();
        this.getAllHangHoa();
    }
}
</script>
<style>
#HangHoaCard-ul {
    justify-content: center;
    list-style-type: none;
    display: flex;
    gap: 40px;
    flex-wrap: wrap;
}

.static {
    width: 50%;
    margin: auto;
}

.form-control {
    margin: 15px 0 15px 0;
}

#search-bar {
    border-radius: 50%;
}

#AppHeader {
    position: static;
    background-color: #0F2C59;
}

#app {
    background-image: none;
}


#UserHomePage-wallpaper {
    width: 100%;
    height: auto;
    z-index: -5;
}
</style>