import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { getSignInUserRequest } from 'apis';
import { useLoginUserStore } from 'stores/index';

export default function OAuth() {

  const { token, expirationTime} = useParams();
  const [cookie, setCookie] = useCookies();
  const navigator = useNavigate();
  const { setLoginUser, resetLoginUser } = useLoginUserStore();

  useEffect(() => {
    
    if (!token || !expirationTime) return;

    const now = (new Date().getTime());
    const expires = new Date(now + Number(expirationTime));

    const isProd = process.env.NODE_ENV === 'production';

    setCookie('accessToken', token, {
      expires, 
      path: "/",
      secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    });

    getSignInUserRequest(token)
      .then(response => {
        const { userId, email, nickname, profileImage, role } = response;
        setLoginUser({ userId, email, nickname, profileImage, role });
        navigator('/');
      })
      .catch(() => {
        // 실패 시 fallback 처리
        resetLoginUser();
        navigator('/');
      });

    
  } , [token]);

  return (
    <> </> 
  )
}
