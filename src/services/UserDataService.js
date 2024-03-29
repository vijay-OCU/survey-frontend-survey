import http from '../http-common';
class UserDataService {
  getAll(data) {
    return http.get('/users/all', {headers:{"x-access-token": data.accessToken}});
  }
  get(id, data) {
    return http.get(`/users/${id}`, {headers:{"x-access-token":data.accessToken}});
  }
  create(data) {
    return http.post('/auth/createuser', data, {headers:{"x-access-token": data.accessToken}});
  }
  update(id, data) {
    return http.put(`/users/${id}`, data, {headers:{"x-access-token":data.accessToken}});
  }
  delete(id, data) {
    return http.delete(`/users/${id}`,{headers:{"x-access-token":data.accessToken}});
  }
  deleteAll(data) {
    return http.delete(`/users`);
  }
  findByTitle(title, data) {
    return http.get(`/users?title=${title}`);
  }
}
export default new UserDataService();
