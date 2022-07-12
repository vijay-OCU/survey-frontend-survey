import http from "../http-common";
class ArtistDataService {
  getAll() {
    return http.get("/artists");
  }
  get(id) {
    return http.get(`/artists/${id}`);
  }
  create(data) {
    return http.post("/artists", data);
  }
  update(id, data) {
    return http.put(`/artists/${id}`, data);
  }
  delete(id) {
    return http.delete(`/artists/${id}`);
  }
  deleteAll() {
    return http.delete(`/artists`);
  }
  findByName(name) {
    return http.get(`/artists?name=${name}`);
  }
}
export default new ArtistDataService();