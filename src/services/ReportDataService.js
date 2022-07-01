import http from "../http-common";
class ReportDataService {
  getAllReports(userId) {
    return http.get(`/users/${userId}/reports`);
  }
  getReport(userId,id) {
    return http.get(`/users/${userId}/reports/${id}`);
  }
  createReport(userId,data) {
    return http.post(`/users/${userId}/reports`, data);
  }
  updateReport(userId,id, data) {
    return http.put(`/users/${userId}/reports/${id}`, data);
  }
  deleteReport(userId,id) {
    return http.delete(`/users/${userId}/reports/${id}`);
  }

}
export default new ReportDataService();