type MarkerColor = 'RED' | 'YELLOW' | 'GREEN' | 'BLUE' | 'PURPLE';

interface Profile {
  id: number;
  email: string;
  nickname: string | null;
  imageUri: string | null;
  kakaoImageUri: string | null;
  loginType: 'email' | 'kakao' | 'apple';
}

interface Marker {
  id: number;
  latitude: number;
  longitude: number;
  color: MarkerColor;
  score: number;
}
interface Post extends Marker {
  title: string;
  address: string;
  date: Date | string;
  description: string;
}

interface ImageUri {
  id?: number;
  uri: string;
}

export type {Profile, MarkerColor, Marker, Post, ImageUri};
