import http from '../http-common';
const responseToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU3NDIxNzUzLCJleHAiOjE2NTc1MDgxNTN9.bbY8afQ-2firZzNHrOiM00CidUPES-JRz_1fnTznMCM";
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
