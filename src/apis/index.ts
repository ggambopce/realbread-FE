const DOMAIN = 'http://localhost:8080';

const API_DOMAIN = `${DOMAIN}/api`;

export const SNS_SIGN_IN_URL = () => `${API_DOMAIN}/auth/oauth2/kakao`