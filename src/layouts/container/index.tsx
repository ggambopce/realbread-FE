import { AUTH_PATH } from 'app-constants';
import Footer from '../footer';
import Header from '../header';
import { Outlet, useLocation } from 'react-router-dom'
import './style.css'
import { useState } from 'react';
import ChatBot from 'views/ChatBot';


//          component: 레이아웃         //
export default function Container() {

    //          state: 현재 페이지 path name 상태           //
    const { pathname } = useLocation();
    //          state: 헤더 상담 창 상태           //
    const [showCounsel, setShowCounsel] = useState(false);
  
    //          render: 레이아웃 렌더링            //
    return (
        <div className='layout-wrapper'>
            <Header onCounselOpen={() => setShowCounsel(true)}/>
            <div className='map-container'>
                <Outlet />
            </div>
            {pathname !== AUTH_PATH() && <Footer />}

            {showCounsel && (
            <div className='bakery-counsel-bot-panel-wrapper'>
                <div className='bakery-counsel-bot-panel'>
                    <ChatBot onClose={() => setShowCounsel(false)} />
                </div>
            </div>
            )}
        </div>

  )
}