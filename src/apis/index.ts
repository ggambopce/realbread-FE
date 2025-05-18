import axios from "axios";
import { GetSignInUserResponseDto } from "./response/auth";

const DOMAIN = 'http://localhost:8080';

const API_DOMAIN = `${DOMAIN}/api`;


// 소셜 로그인 리다이렉트 URL 요청 함수
export const SNS_SIGN_IN_URL = () => `${API_DOMAIN}/auth/oauth2/kakao`

export const getSignInUserRequest = async (token: string): Promise<GetSignInUserResponseDto> => {
  const response = await axios.get(`${API_DOMAIN}/auth/user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};