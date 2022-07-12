import http from "../http-common";
class TrackDataService {
  getAllTracks(albumId) {
    return http.get(`/albums/${albumId}/tracks`);
  }
  getTrack(albumId,id) {
    return http.get(`/albums/${albumId}/tracks/${id}`);
  }
  createTrack(albumId,data) {
    return http.post(`/albums/${albumId}/tracks`, data);
  }
  updateTrack(albumId,id, data) {
    return http.put(`/albums/${albumId}/tracks/${id}`, data);
  }
  deleteTrack(albumId,id) {
    return http.delete(`/albums/${albumId}/tracks/${id}`);
  }

}
export default new TrackDataService();