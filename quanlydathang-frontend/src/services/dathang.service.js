import createApiClient from "./api.service";
import axios from 'axios';

class DatHangService {
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const dathangs = (await this.api.get("/dh")).data;
      return dathangs.data.dathang;
    } catch (err) {
      throw err;
    }
  }
  async getOne(id) {
    try {
      const dathang = (await this.api.get("/dh/" + id)).data;
      return dathang.data.dathang[0];
    } catch (err) {
      throw err;
    }
  }
  async update(data, id) {
    return await axios.patch(`http://localhost:3000/api/dh/${id}`, data).then((res) => {
      return res.data;
    }).catch((err) => {
      throw err
    })
  }
  async create(data) {
    return await axios.post(`http://localhost:3000/api/dh`, data).then((res) => {
      return res.data;
    }).catch((err) => {
      throw err
    })
  }
  async delete(id) {
    try {
      const res = (await this.api.delete("/dh/" + id));
      return res;
    } catch (err) {
      throw err;
    }
  }
}

export default new DatHangService();