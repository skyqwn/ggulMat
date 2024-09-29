import {getEncryptStorage} from '@/utils';
import axiosInstance from './axios';

type RequsetUser = {
  email: string;
  password: string;
};

const postSignup = async ({email, password}: RequsetUser): Promise<void> => {
  const {data} = await axiosInstance.post('/auth/signup', {
    email,
    password,
  });
  return data;
};

const postLogin = async ({email, password}: RequsetUser) => {
  const {data} = await axiosInstance.post('auth/signin', {
    email,
    password,
  });
};

const getProfile = async () => {
  const {data} = await axiosInstance.get('/auth/me');

  return data;
};

const getAccessToken = async () => {
  const refreshToken = await getEncryptStorage('refreshToken');
  const {data} = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

const logout = async () => {
  await axiosInstance.post('auth/logout');
};

export {postSignup, postLogin, getProfile, getAccessToken, logout};
