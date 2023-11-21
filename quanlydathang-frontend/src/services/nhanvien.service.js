import createApiClient from "./api.service";
import axios from 'axios';

class NhanVienService {
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const nhanviens = (await this.api.get("/nv")).data;
      return nhanviens.data.nhanvien;
    } catch (err) {
      throw err;
    }
  }
  async getOne(id) {
    try {
      const nhanvien = (await this.api.get("/nv/" + id)).data;
      return nhanvien.data.nhanvien[0];
    } catch (err) {
      throw err;
    }
  }
  async create(data) {
    return await axios.post(`http://localhost:3000/api/nv`, data).then((res) => {
      return res.data;
    }).catch((err) => {
      throw err
    })
  }
  async update(data, id) {
    return await axios.patch(`http://localhost:3000/api/nv/${id}`, data).then((res) => {
      return res.data;
    }).catch((err) => {
      throw err
    })
  }
  async delete(id) {
    try {
      const res = (await this.api.delete("/nv/" + id));
      return res;
    } catch (err) {
      throw err;
    }
  }
}

export default new NhanVienService();