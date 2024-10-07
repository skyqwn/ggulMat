import {Marker} from '@/types/domain';
import axiosInstance from './axios';

const getMarkers = async (): Promise<Marker[]> => {
  const {data} = await axiosInstance.get('/posts/markers/my');
  return data;
};

export {getMarkers};
