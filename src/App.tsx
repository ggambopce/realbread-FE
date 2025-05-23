import './App.css'
import { Route, Routes } from 'react-router-dom'
import Container from './layouts/container'
import Main from './views/Main'
import UserP from './views/User'
import OAuth from 'views/Authentication/OAuth'
import { MAIN_PATH } from './app-constants'
import { USER_PATH } from './app-constants'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useLoginUserStore } from './stores'
import { GetSignInUserResponseDto } from 'apis/response/auth'
import User from 'types/interface/user.interface'
import { getSignInUserRequest } from 'apis'
import ResponseDto from 'apis/response/response.dto'

//          component: Application 컴포넌트          //
function App() {
  //          state: 로그인 유저 전역 상태          //
  const { setLoginUser, resetLoginUser} = useLoginUserStore();
  //          state: cookie 상태          //
  const [cookies, setCookie] = useCookies();

  //          function: get sign in user response 처리 함수         //
  const getSignInUserResponse = (responseBody: GetSignInUserResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === 'AF' || code === 'NU' || code === 'DBE' ) {
      resetLoginUser();
      return;
    }
    const loginUser: User = { ...responseBody as GetSignInUserResponseDto};
    setLoginUser(loginUser);
  }

  //          effect: accessToken cookie 값이 변경될 때 마다 실행할 함수          //
  useEffect( () => {
    if (!cookies.accessToken) {
      resetLoginUser();
      return;
    }
    getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse)
  }, [cookies.accessToken])

  //          render: Application 랜더링          //
  //  description: 메인 화면 : '/' - Main Map //
  //  description: 로그인 + 회원가입 화면 : '/auth' - Authentication  //
  //  description: 유저 페이지  : '/user/:userEmail' - User //
  //  description: 상담 봇 레코더 : '/edubot/recoder' - Recoder //
  return (
    <Routes>
        <Route element={<Container />}>
          <Route path={MAIN_PATH()} element={ <Main /> } />
          <Route path="/search/:searchWord" element={<Main />} />
          <Route path={USER_PATH(':userId')} element={ <UserP />}/>
          <Route path='/auth/oauth-response/:token/:expirationTime' element= {<OAuth/>} />
          <Route path= '*' element={<h1>404 Not Found</h1>} />
        </Route> 
        
      </Routes>
  )
}

export default App
