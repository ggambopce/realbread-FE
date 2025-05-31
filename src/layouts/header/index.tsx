import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';
import { SNS_SIGN_IN_URL } from 'apis';
import { AUTH_PATH, MAIN_PATH, USER_PATH } from 'app-constants';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import useLoginUserStore from 'stores/login-user.store';
import { faArrowRightFromBracket, faArrowRightToBracket, faHeadset } from '@fortawesome/free-solid-svg-icons';

interface Props {
    onCounselOpen: () => void;
}

//          component: Header 레이아웃          //
export default function Header({ onCounselOpen }: Props) {
    //          state: 로그인 유저 상태         //
    const { loginUser, resetLoginUser } = useLoginUserStore();
    //          state: path 상태           //
    const { pathname } = useLocation();
    //          state: cookie 상태          //
    const [, setCookie] = useCookies();
    //          state: 로그인 상태          //
    const [isLogin, setLogin] = useState<boolean>(false);
    //          state: 인증 페이지 상태          //
    const [, setAuthPage] = useState<boolean>(false);
    //          state: 메인 페이지 상태          //
    const [isMainPage, setMainPage] = useState<boolean>(false);
    //          state: 유저 페이지 상태          //
    const [isUserPage, setUserPage] = useState<boolean>(false);

    //          function: 네비게이트 함수           //
    const navigator = useNavigate();

    //          event handler: 로고 클릭 이벤트 처리 함수           //
    const onLogoClickHandler = () => {
        if (pathname === MAIN_PATH()) {
            // 현재가 메인 페이지면 새로고침
            window.location.reload();
        } else {
            // 아니면 메인 페이지로 이동
            navigator(MAIN_PATH());
        }
    };

    //          component: 카카오 로그인 버튼 컴포넌트          //
    const KakaoButton = () => {
    
        //          event handler:  로그아웃 버튼 클릭 이벤트 처리 함수           //
        const onSignOutButtonClickHandler = () => {
            resetLoginUser();
            setCookie('accessToken', '', { path: MAIN_PATH(), expires: new Date() });
            navigator(MAIN_PATH());
        };
        //          event handler:  로그인 버튼 클릭 이벤트 처리 함수           //
        const onSnsSignInButtonClickHandler = () => {
            window.location.href = SNS_SIGN_IN_URL();
        };

        //          render: 로그아웃 버튼 컴포넌트 렌더링         //
        if (isLogin)
            return (
       
                <div className="header-button" onClick={onSignOutButtonClickHandler}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    <div>로그아웃</div>
                </div>
            );
        //          render: 로그인 버튼 컴포넌트 렌더링         //
        return (
        <div className="header-button" onClick={onSnsSignInButtonClickHandler}> 
                        <FontAwesomeIcon icon={faArrowRightToBracket} />
                        <div>카카오 로그인</div>
                    </div>)
    };

    //          effect: pathname이 변경될 떄 마다 실행될 함수            //
    useEffect(() => {
        const isAuthPage = pathname.startsWith(AUTH_PATH());
        setAuthPage(isAuthPage);
        const isMainPage = pathname === MAIN_PATH();
        setMainPage(isMainPage);
        const isUserPage = pathname.startsWith(USER_PATH(''));
        setUserPage(isUserPage);
    }, [pathname]);

    //          effect: login user가 변경될 때 마다 실행될 함수          //
    useEffect(() => {
        setLogin(loginUser !== null);
    }, [loginUser]);

    //          render: Header 레이아웃 렌더링          //
    return (
        <div id="header">
            <div className="header-container">
                <div className="header-left-box" onClick={onLogoClickHandler}>
                    <div className="header-icon-box">
                        <div className="icon logo-black-icon"></div>
                    </div>
                    <div className="header-logo">{'진짜빵집'}</div>
                    <div className="header-logo-sub">{'in 대전'}</div>
                </div>
                <div className="header-right-box">
                    
                    <div className="header-button" onClick={onCounselOpen}>
                        <FontAwesomeIcon icon={faHeadset} />
                        <div>AI 상담 챗봇</div>
                    </div>
                    {(isMainPage || isUserPage) && <KakaoButton />}
                </div>
            </div>
        </div>
    );
}
