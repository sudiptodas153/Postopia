import axios from 'axios';
import { getAuth } from 'firebase/auth';

const axiosSecure = axios.create({
  baseURL: 'https://postopia-server.vercel.app', // or your deployed URL
});

const useAxiosSecure = () => {
  const auth = getAuth();

  // Add interceptor only once
  axiosSecure.interceptors.request.use(
    async (config) => {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken(); // ✅ Firebase Token
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
