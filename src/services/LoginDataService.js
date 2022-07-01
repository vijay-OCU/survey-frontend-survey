import http from '../http-common';
class LoginDataService {
  getAll() {
    return http.get('/logins');
  }
  get(id) {
    return http.get(`/logins/${id}`);
  }
  create(data) {
    return http.post('/logins', data);
  }
  update(id, data) {
    return http.put(`/logins/${id}`, data);
  }
  delete(id) {
    return http.delete(`/logins/${id}`);
  }
  deleteAll() {
    return http.delete(`/logins`);
  }
  findByTitle(title) {
    return http.get(`/logins?title=${title}`);
  }
  findBySurvey(userId) {
    return http.get(`/logins/survey/${surveyId}`);
  }
}
export default new LoginDataService();
