import axiosInstance from './axios';

const uploadImages = async (body: FormData): Promise<string[]> => {
  const {data} = await axiosInstance.post('/images', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }, // 이미지업로드시 헤더에 추가
  });
  console.log(data);
  return data;
};

export {uploadImages};
