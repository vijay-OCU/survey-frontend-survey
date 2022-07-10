import http from '../http-common';
class LoginDataService {
  
  login(data) {
    return http.post('/auth/login', data);
  }
 
  
}
export default new LoginDataService();
