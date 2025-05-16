import './App.css'
import { Route, Routes } from 'react-router-dom'
import Container from './layouts/container'
import { EDUBOT_RECODER, MAIN_PATH, SEARCH_PATH, USER_PATH } from './app-constants/index'
import Main from './views/Main'
import Search from './views/Search'
import UserP from './views/User'
import EduBot from 'views/EduBot'
import OAuth from 'views/Authentication/OAuth'
import { CookiesProvider } from 'react-cookie';


//          component: Application 컴포넌트          //
function App() {

  //          render: Application 랜더링          //
  //  description: 메인 화면 : '/' - Main Map //
  //  description: 로그인 + 회원가입 화면 : '/auth' - Authentication  //
  //  description: 검색 화면 : '/search/:word' - Search  //
  //  description: 유저 페이지  : '/user/:userEmail' - User //
  //  description: 상담 봇 레코더 : '/edubot/recoder' - Recoder //
  return (
    <Routes>
        <Route element={<Container />}>
          <Route path={MAIN_PATH()} element={ <Main /> } />
          <Route path={SEARCH_PATH(':searchWord')} element={ <Search />}/>
          <Route path={USER_PATH(':userEmail')} element={ <UserP />}/>
          <Route path='/auth/oauth-response/:token/:expirationTime' element= {<OAuth/>} />
          <Route path={EDUBOT_RECODER()} element={ <EduBot />} />
          <Route path= '*' element={<h1>404 Not Found</h1>} />
        </Route> 
        
      </Routes>
  )
}

export default App
