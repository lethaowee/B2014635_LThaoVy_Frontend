import createApiClient from "./api.service";
import axios from 'axios';

class HinhHangHoaService {
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const hinhhanghoas = (await this.api.get("/hhh")).data;
      return hinhhanghoas.data.hinhhanghoa;
    } catch (err) {
      throw err;
    }
  }
  async getAllByMSHH(id) {
    try {
      const hinhhanghoas = (await this.api.get("/hhh/mshh/" + id)).data;
      return hinhhanghoas.data.hinhhanghoa;
    } catch (err) {
      throw err;
    }
  }
  async getOne(id) {
    try {
      const hinhhanghoa = (await this.api.get("/hhh/" + id)).data;
      return hinhhanghoa.data.hinhhanghoa[0];
    } catch (err) {
      throw err;
    }
  }
  async create(data) {
    return await axios.post(`http://localhost:3000/api/hhh`, data).then((res) => {
      return res.data;
    }).catch((err) => {
      throw err
    })
  }
  async delete(id) {
    try {
      const res = (await this.api.delete("/hhh/" + id));
      return res;
    } catch (err) {
      throw err;
    }
  }
  async update(data, id) {
    return await axios.patch(`http://localhost:3000/api/hhh/${id}`, data).then((res) => {
      return res.data;
    }).catch((err) => {
      throw err
    })
  }
  async deleteByMSHH(id) {
    try {
      const res = (await this.api.delete("/hhh/mshh/" + id));
      return res;
    } catch (err) {
      throw err;
    }
  }
}

export default new HinhHangHoaService();