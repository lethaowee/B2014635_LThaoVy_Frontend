import createApiClient from "./api.service";
import axios from 'axios';

class HangHoaService {
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const hanghoas = (await this.api.get("/hh")).data;
      return hanghoas.data.hanghoa;
    } catch (err) {
      throw err;
    }
  }
  async getOne(id) {
    try {
      const hanghoa = (await this.api.get("/hh/" + id)).data;
      return hanghoa.data.hanghoa[0];
    } catch (err) {
      throw err;
    }
  }
  async update(data, id) {
    return await axios.patch(`http://localhost:3000/api/hh/${id}`, data).then((res) => {
      return res.data;
    }).catch((err) => {
      throw err
    })
  }
  async create(data) {
    return await axios.post(`http://localhost:3000/api/hh`, data).then((res) => {
      return res.data;
    }).catch((err) => {
      throw err
    })
  }
  async delete(id) {
    try {
      const res = (await this.api.delete("/hh/" + id));
      return res;
    } catch (err) {
      throw err;
    }
  }
}

export default new HangHoaService();