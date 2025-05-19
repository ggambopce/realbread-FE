import axios from "axios";
import { GetSignInUserResponseDto } from "./response/auth";
import { GetBakeryMainListResponseDto } from "./response/bakery";
import { ResponseDto } from "./response";

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

const GET_BAKERY_MAIN_LIST_URL = () => `${API_DOMAIN}/bakery/main-list`

export const getBakeryMainListRequest = async () => {
  const result = await axios.get(GET_BAKERY_MAIN_LIST_URL())
    .then(response => {
      const responseBody: GetBakeryMainListResponseDto = response.data;
      return responseBody;
    })  
    .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
}
