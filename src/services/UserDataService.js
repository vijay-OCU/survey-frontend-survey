import http from '../http-common';
class UserDataService {
  getAll(data) {
    return http.get('/users/all', {headers:{"x-access-token": data.accessToken}});
  }
  get(id, data) {
    return http.get(`/users/${id}`);
  }
  create(data) {
    return http.post('/users', data);
  }
  update(id, data) {
    return http.put(`/users/${id}`, data);
  }
  delete(id, data) {
    return http.delete(`/users/${id}`);
  }
  deleteAll(data) {
    return http.delete(`/users`);
  }
  findByTitle(title, data) {
    return http.get(`/users?title=${title}`);
  }
}
export default new UserDataService();
