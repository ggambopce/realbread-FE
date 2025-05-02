import React from 'react';
import './style.css';

//          component: Footer 레이아웃          //
export default function Footer() {
  
    //          event handler: jinorandb 아이콘 버튼 클릭 이벤트 처리           //
    const onRandbIconButtonClickHandler = () => {
        window.open('https://jinorandb.com');
    }

    //          event handler: youtube 아이콘 버튼 클릭 이벤트 처리          //
    const onYoutubeIconButtonClickHandler = () => {
        window.open('https://www.youtube.com/@ggambopce');
    }
  
    //          render: Footer 랜더링           //
    return (
        <div id='footer'>
        <div className='footer-container'>
            <div className='footer-top'>
                <div className='footer-logo-box'>
                    <div className='icon-box'>
                        <div className='icon logo-black-icon'></div>
                    </div>
                    <div className='footer-logo-text'>{'Real Bread'}</div>
                </div>
                <div className='footer-link-box'>
                    <div className='footer-email-link'>{'ggambopce@gmail.com'}</div>
                    <div className='icon-button' onClick={onRandbIconButtonClickHandler}>
                        <div className='icon randb-icon'></div>
                    </div>
                    <div className='icon-button' onClick={onYoutubeIconButtonClickHandler}>
                        <div className='icon youtube-icon'></div>
                    </div>
                </div>
            </div>
            <div className='footer-bottom'>
                <div className='footer-copyright'>{'Copyright © JINO. ALL RIGHTS RESERVED'}</div>
            </div>
        </div>
    </div>
  )
}
