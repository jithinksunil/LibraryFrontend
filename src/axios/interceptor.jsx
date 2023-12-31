import axios from 'axios';
import useAuth from '../Components/authentication/authContext/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8800/api',
  headers: { 'Content-Type': 'application/json' },
});

function useAxiosInstance() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 403) {
          const role = token.role;
          setAuth({ userName: '', accessToken: '', role: '' });
          localStorage.removeItem('accessToken');
          if (role === 'ADMIN') {
            navigate('/admin/login', { replace: true });
          }
          navigate('/login', { replace: true });
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, []);
  return { axiosInstance };
}
export default useAxiosInstance;
