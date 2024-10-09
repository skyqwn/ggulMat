import {ImageUri, Post} from '@/types/domain';
import axiosInstance from './axios';

type ResponsePost = Post & {images: ImageUri[]};

type RequsetCreatePost = Omit<Post, 'id'> & {imageUris: ImageUri[]};

const createPost = async (body: RequsetCreatePost): Promise<ResponsePost> => {
  const {data} = await axiosInstance.post('/posts', body);

  return data;
};

type ResponseSinglePost = ResponsePost & {isFavorite: boolean};

const getPost = async (id: number): Promise<ResponseSinglePost> => {
  const {data} = await axiosInstance.get(`/posts/${id}`);
  return data;
};

export {createPost, getPost};

export type {ResponsePost, ResponseSinglePost};
