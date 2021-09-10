import axios from "axios";

axios.interceptors.request.use(function (config) {
  config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  switch (error.response?.status) {
    case 401:
      localStorage.removeItem('token');
      location.href = 'http://localhost:30001'; // 環境変数を使うなりして書き変える
      break;
    case 500:
      alert(error);
      break;
    default:
      return error;
  }
});

export default axios;