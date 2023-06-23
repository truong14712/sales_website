import axios from "axios";
//   if (token) {
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete axios.defaults.headers.common["Authorization"];
//   }
// };
const instance = axios.create({
  baseURL: "http://127.0.0.1:7500/api",
  timeout: 1000,
});
instance.interceptors.request.use(
  function (config) {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "")
      : null;
    if (user) {
      config.headers["Authorization"] = `Bearer ${user.accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
