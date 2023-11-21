import createApiClient from "./api.service";
import axios from 'axios';

class KhachHangService {
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const khachhangs = (await this.api.get("/kh")).data;
      return khachhangs.data.khachhang;
    } catch (err) {
      throw err;
    }
  }
  async getOne(id) {
    try {
      const khachhang = (await this.api.get("/kh/" + id)).data;
      return khachhang.data.khachhang[0];
    } catch (err) {
      throw err;
    }
  }
  async update(data, id) {
    return await axios.patch(`http://localhost:3000/api/kh/${id}`, data).then((res) => {
      return res.data;
    }).catch((err) => {
      throw err
    })
  }
  async create(data) {
    return await axios.post(`http://localhost:3000/api/kh`, data).then((res) => {
      return res.data;
    }).catch((err) => {
      throw err
    })
  }
  async delete(id) {
    try {
      const res = (await this.api.delete("/kh/" + id));
      return res;
    } catch (err) {
      throw err;
    }
  }
}

export default new KhachHangService();