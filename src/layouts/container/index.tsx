import { AUTH_PATH } from 'app-constants';
import Footer from '../footer';
import Header from '../header';
import { Outlet, useLocation } from 'react-router-dom'
import './style.css'


//          component: 레이아웃         //
export default function Container() {

    //          state: 현재 페이지 path name 상태           //
    const { pathname } = useLocation();
  
    //          render: 레이아웃 렌더링            //
    return (
        <div className='layout-wrapper'>
            <Header />
            <div className='map-container'>
                <Outlet />
            </div>
            
            {pathname !== AUTH_PATH() && <Footer />}
        </div>

  )
}