import axios from "axios";

const axiosInterceptor = (logout: any) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInterceptor;
