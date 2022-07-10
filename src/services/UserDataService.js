import http from '../http-common';
class UserDataService {
  getAll() {
    return http.get('/users/all', {headers:{"x-access-token": responsetoken}});
  }
  get(id) {
    return http.get(`/users/${id}`);
  }
  create(data) {
    return http.post('/users', data);
  }
  update(id, data) {
    return http.put(`/users/${id}`, data);
  }
  delete(id) {
    return http.delete(`/users/${id}`);
  }
  deleteAll() {
    return http.delete(`/users`);
  }
  findByTitle(title) {
    return http.get(`/users?title=${title}`);
  }
  findByArtist(userId) {
    return http.get(`/users/survey/${surveyId}`);
  }
}
export default new UserDataService();
