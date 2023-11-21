import createApiClient from "./api.service";
import axios from 'axios';

class CTDHService {
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const chitietdathangs = (await this.api.get("/ctdh")).data;
      return chitietdathangs.data.chitietdathang;
    } catch (err) {
      throw err;
    }
  }
  async getOne(id, id1) {
    try {
      const chitietdathang = (await this.api.get("/ctdh/" + id + "/" + id1)).data;
      return chitietdathang.data.chitietdathang[0];
    } catch (err) {
      throw err;
    }
  }
  async create(data) {
    return await axios.post(`http://localhost:3000/api/ctdh`, data).then((res) => {
      return res.data;
    }).catch((err) => {
      throw err
    })
  }
  async delete(id, id1) {
    try {
      const res = (await this.api.delete("/ctdh/" + id + "/" + id1));
      return res;
    } catch (err) {
      throw err;
    }
  }
  async deleteByMSHH(id) {
    try {
      const res = (await this.api.delete("/ctdh/mshh/" + id));
      return res;
    } catch (err) {
      throw err;
    }
  }
}

export default new CTDHService();