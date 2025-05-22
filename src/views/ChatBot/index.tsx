import './style.css'
import React from 'react'

interface Props {
    onClose: () => void;
}

//          component: 상담 봇 채팅 패널 컴포넌트          //
export default function ChatBot({onClose}: Props) {
    //          event handler: 닫기 버튼 클릭 이벤트 처리           //
    const onCloseButtonClickHandler = () => {
        onClose();
    }

    //          render: 상담 봇 채팅 패널 컴포넌트 랜더링          //
    return (
        <div id='bakery-counsel-bot-chat-wrapper'>
            <div className='bakery-counsel-bot-chat-top'>
                <div className='bakery-counsel-bot-chat-title'>{'채팅상담'}</div>
                <div className='icon-button' onClick={onCloseButtonClickHandler}>
                    <div className='icon close-icon'></div>
                </div> 
            </div>
            <div className='bakery-counsel-bot-chat-middle'>
                <div className='bakery-counsel-bot-chat-counsel-box'></div>
                </div>
            <div className='bakery-counsel-bot-chat-bottom'>
                <div className='bakery-counsel-bot-chat-input-box'></div>
            </div> 
        </div>
    )
}
