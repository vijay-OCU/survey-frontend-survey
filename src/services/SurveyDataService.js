import http from "../http-common";
const responseToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU3NDIxNzUzLCJleHAiOjE2NTc1MDgxNTN9.bbY8afQ-2firZzNHrOiM00CidUPES-JRz_1fnTznMCM";
class SurveyDataService {
  getAll() {
    return http.get("/surveys/all", {headers:{"x-access-token": responseToken}});
  }
  get(id) {
    return http.get(`/surveys/${id}`);
  }
  create(data) {
    return http.post("/surveys", data);
  }
  update(id, data) {
    return http.put(`/surveys/${id}`, data);
  }
  delete(id) {
    return http.delete(`/surveys/${id}`);
  }
  deleteAll() {
    return http.delete(`/surveys`);
  }
  findByName(name) {
    return http.get(`/surveys?name=${name}`);
  }
}
export default new SurveyDataService();