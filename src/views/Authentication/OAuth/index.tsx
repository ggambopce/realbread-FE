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

    setCookie('accessToken', token, {expires, path: "/"});

    getSignInUserRequest(token)
      .then(response => {
        const { userId, nickname, profileImage } = response.data;
        setLoginUser({ userId, nickname, profileImage });
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
