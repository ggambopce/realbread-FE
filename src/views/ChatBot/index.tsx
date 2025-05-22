import { PostCounselTextRequestDto } from 'apis/request/chatBot';
import './style.css'
import React, { ChangeEvent, useRef, KeyboardEvent, useState } from 'react'
import { postCounselTextRequest } from 'apis';
import { PostCounselTextResponseDto } from 'apis/response/chatBot';
import { ResponseDto } from 'apis/response';

interface Props {
    onClose: () => void;
}

//          component: 상담 봇 채팅 패널 컴포넌트          //
export default function ChatBot({onClose}: Props) {
    
    //          state: 채팅 로그 상태          //
    const [chatLog, setChatLog] = useState<
    { sender: 'user' | 'bot'; message: string; emotion?: string }[]
    >([]);

    //          state: 채팅 textarea 참조 상태           //
    const chatQuestionRef = useRef<HTMLTextAreaElement | null>(null);
    //          state: 채팅 상태          //
    const [chatQuestion, setChatQuestion] = useState<string>('');
    //          state: 보내기 상태          //
    const [isSending, setIsSending] = useState<boolean>(false);

    //          event handler: 닫기 버튼 클릭 이벤트 처리           //
    const onCloseButtonClickHandler = () => {
        onClose();
    }
    //          event handler: 상담 질문 키다운 이벤트 처리           //
    const onChatKeyDownHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // 줄바꿈 막고
            onChatQuestionSubmitHandler(); // 메시지 전송
        }
    };
    //          event handler: 상담 질문 전송 이벤트 처리           //
    const onChatQuestionSubmitHandler = () => {
        if (!chatQuestion.trim() || isSending) return;
        setIsSending(true); // ← 전송 시작 전 설정
        // 사용자 메시지 추가
        setChatLog(prev => [...prev, { sender: 'user', message: chatQuestion }]);
        const requestBody: PostCounselTextRequestDto = { chatQuestion };
        postCounselTextRequest(requestBody).then((response)=>{
            postCounselTextResponse(response);
            setIsSending(false);
        });
        
    };
    //          event handler: 댓글 변경 이벤트 처리           //
    const onChatQuestionChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      setChatQuestion(value);
      if (!chatQuestionRef.current) return;
      chatQuestionRef.current.style.height = 'auto';
      chatQuestionRef.current.style.height = `${chatQuestionRef.current.scrollHeight}px`;

    }

     //          function: post comment response 처리 함수          //
    const postCounselTextResponse  = (responseBody: PostCounselTextResponseDto | ResponseDto | null) => {
      if (!responseBody) {
        console.warn('응답 없음');
        return;
      }
      if ('response' in responseBody && 'emotion' in responseBody) {
      
      // responseBody를 PostCounselTextResponseDto로 타입 단언 후 사용
      const { response, emotion } = responseBody as PostCounselTextResponseDto;

      // 챗봇 응답을 chatLog에 추가
      setChatLog(prev => [...prev, {
            sender: 'bot',
            message: response,
            emotion
        }]);

        // 입력창 초기화
        setChatQuestion('');
        }

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
                <div className='bakery-counsel-bot-chat-counsel-box'>
                    <div className='bakery-counsel-bot-chat-counsel-container'>
                        {chatLog.map((chat, index) => (
                            <div key={index} className={`chat-bubble ${chat.sender}`}>
                                <span className="chat-message">{chat.message}</span>
                                {chat.sender === 'bot' && chat.emotion && (
                                <div className="chat-emotion-wrapper">
                                    <div className={`chat-emotion-icon ${chat.emotion || 'BASIC_SMILE'}`} />
                                    <span className="chat-emotion-label">{chat.emotion || '기본스마일'}</span>
                                </div>
                                )}
                            </div>
                            ))}
                    </div>
                </div>
                </div>
            <div className='bakery-counsel-bot-chat-bottom'>
                <div className='bakery-counsel-bot-chat-input-box'>
                    <div className='bakery-counsel-bot-chat-input-container'>
                        <textarea ref={chatQuestionRef} className='bakery-counsel-bot-chat-textarea' placeholder='무엇이든 물어보세요' value={chatQuestion} onChange={onChatQuestionChangeHandler} onKeyDown={onChatKeyDownHandler} />
                  
                    </div>
                </div>
            </div> 
        </div>
    )
}
