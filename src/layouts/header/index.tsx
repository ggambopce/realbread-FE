import './style.css'
import { useNavigate } from 'react-router-dom';
import { SNS_SIGN_IN_URL } from 'apis';
import kakaoLoginButton from 'assets/image/kakao-login-button.png'

//          component: Header 레이아웃          //
export default function Header() {

  //          function: 네비게이트 함수           //
  const navigator = useNavigate();

  //          component: 마이페이지 버튼 컴포넌트          //
  const MyPageButton = () => {

    //          event handler:  로그인 버튼 클릭 이벤트 처리 함수           //
    const onSnsSignInButtonClickHandler = () => {
      window.location.href = SNS_SIGN_IN_URL();
    };

    //          render: 로그인 버튼 컴포넌트 렌더링         //
    return <img src={kakaoLoginButton} onClick={onSnsSignInButtonClickHandler} className = 'kakao-login-button' />;
  
  }
    

  //          render: Header 레이아웃 렌더링          //  
  return (
    <div id='header'>
        <div className='header-container'>
            <div className='header-left-box'>
                <div className='icon-box'>
                    <div className='icon logo-edu-icon'></div>
                </div>
                <div className='header-logo'>{'Real Bread'}</div>
            </div>
            <div className='header-right-box'>
                <MyPageButton />
            </div>
        </div>
    </div>
  )
}
