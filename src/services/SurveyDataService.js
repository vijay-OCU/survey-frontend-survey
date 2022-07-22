import http from "../http-common";
class SurveyDataService {
  getAll(data) {
    return http.get("/surveys/all", {headers:{"x-access-token": data.accessToken}});
  }
  get(id, data) {
    return http.get(`/surveys/id/${id}`, {headers:{"x-access-token": data.accessToken}});
  }
  getByUserId(id, data) {
    return http.get(`/users/${id}/surveys`, {headers:{"x-access-token": data.accessToken}});
  }
  create(data) {
    return http.post("/surveys/create", data, {headers:{"x-access-token": data.accessToken}});
  }
  addQuestions(id, questionData, token) {
    return http.post(`surveys/${id}/questions/create`, questionData, {headers:{"x-access-token": token}});
  }
  update(id, data) {
    return http.put(`/surveys/${id}`, data);
  }
  delete(id, data) {
    return http.delete(`/surveys/id/${id}`,{headers:{"x-access-token": data.accessToken}});
  }
  deleteAll() {
    return http.delete(`/surveys`);
  }
  findByName(name) {
    return http.get(`/surveys?name=${name}`);
  }
}
export default new SurveyDataService();