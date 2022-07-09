import http from '../http-common';
class LoginDataService {
  
  signin(data) {
    return http.post('/auth/signin', data);
  }
 
  
}
export default new LoginDataService();
