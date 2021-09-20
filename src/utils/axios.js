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
      if(localStorage.getItem('token')){
        const host = process.env.HOST ? `https://${process.env.HOST}` : 'http://localhost:30001';
        localStorage.removeItem('token');
        location.href = host;
      }
      break;
    case 500:
      alert(error);
      break;
  }
  throw error;
});

export default axios;