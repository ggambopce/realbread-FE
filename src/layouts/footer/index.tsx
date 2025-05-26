import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faHouseLaptop } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';


//          component: Footer 레이아웃          //
export default function Footer() {
    //          event handler: jinorandb 아이콘 버튼 클릭 이벤트 처리           //
    const onRandbIconButtonClickHandler = () => {
        window.open('https://jinorandb.com');
    };

    //          event handler: youtube 아이콘 버튼 클릭 이벤트 처리          //
    const onYoutubeIconButtonClickHandler = () => {
        window.open('https://www.youtube.com/@ggambopce');
    };

    //          render: Footer 랜더링           //
    return (
        <div id="footer">
            <div className="footer-container">
                {/* 좌측 정보 */}
                <div className="footer-logo-box">
                    <div className="icon-box">
                        <div className="icon logo-black-icon"></div>
                    </div>
                    <div className="footer-logo-text">진짜빵집</div>
                </div>
                {/* 중앙 정보 */}
                <div className="footer-center-box">
                    <div>Copyright © 2025 JINO. ALL RIGHTS RESERVED</div>
                </div>
                {/* 우축 정보 */}
                <div className="footer-link-box">
                    <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                    <div className="footer-email-link">{'ggambopce@gmail.com'}</div>
                    <div className='footer-none'></div>
                    <div className="icon-button" onClick={onRandbIconButtonClickHandler}>
                        <FontAwesomeIcon icon={faHouseLaptop} />
                    </div>
                    <div className="icon-button" onClick={onYoutubeIconButtonClickHandler}>
                        <FontAwesomeIcon icon={faYoutube} />
                    </div>
                </div>
            </div>
        </div>
    );
}
