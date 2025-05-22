import { PostCounselTextRequestDto } from 'apis/request/chatBot';
import './style.css'
import React, { ChangeEvent, useRef, KeyboardEvent, useState } from 'react'
import { postCounselTextRequest } from 'apis';
import { PostCounselTextResponseDto } from 'apis/response/chatBot';
import { ResponseDto } from 'apis/response';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faMicrophoneLines, } from '@fortawesome/free-solid-svg-icons';
import Recorder from 'components/edubotRecoder';

interface Props {
    onClose: () => void;
}
const emotionMap: Record<string, string> = {
  '거부': 'REJECT',
  '고민중': 'THINKING',
  '그건아니지화남': 'ANGRY_DISAGREE',
  '긍적긍적미안': 'SORRY_POSITIVE',
  '기대만발': 'EXCITED',
  '기본스마일': 'BASIC_SMILE',
  '나센스있는데': 'SENSE_MAN',
  '나짜증': 'ANNOYED',
  '나황당': 'DUMBFOUNDED',
  '난감한표정': 'AWKWARD',
  '너무미안': 'VERY_SORRY',
  '너무좋아사랑': 'LOVE_HAPPY',
  '놀래키기': 'SURPRISED',
  '누군가를좋아함': 'CRUSH',
  '달콤하고맛있어': 'SWEET_YUMMY',
  '덜덜무서움': 'SHAKING',
  '따봉좋아': 'THUMBS_UP',
  '땀삐질당황': 'SWEAT_EMBARRASSED',
  '똑똑이': 'SMART',
  '미안': 'SORRY',
  '바램': 'WISH',
  '뿌뿌신난다': 'EXCITED_BLOW',
  '삐짐슬픔': 'SAD_POUT',
  '사랑고백하트': 'LOVE_HEART',
  '생일축하': 'BIRTHDAY',
  '손가락비난': 'FINGER_BLAME',
  '수줍은안녕': 'SHY_HELLO',
  '수줍은웃음': 'SHY_SMILE',
  '수줍은하트': 'SHY_HEART',
  '수줍은헤벌레사랑': 'SHY_LOVE_HEBUL',
  '싫어': 'HATE',
  '심각한고민': 'SERIOUS',
  '싸우고싶은화남': 'ANGRY_ARGUE',
  '싸우자': 'FIGHT',
  '안녕': 'HELLO',
  '오궁금': 'CURIOUS',
  '요리시작': 'START_COOK',
  '요리중': 'COOKING',
  '우거절비난': 'DENY_BLAME',
  '우쭐나최고': 'PROUD',
  '위험해멈춰': 'DANGER_STOP',
  '유혹': 'TEMPTING',
  '으악걱정돼': 'WORRIED',
  '자아도취': 'NARCISSISM',
  '졸림': 'SLEEPY',
  '좋은아이디어': 'GOOD_IDEA',
  '집중해': 'FOCUS',
  '찾는중': 'SEARCHING',
  '키득키득': 'GIGGLE',
  '한잔해': 'DRINK',
  '헤벌레사랑에빠짐': 'LOVE_HEBUL',
  '화나는데들어봄': 'LISTEN_ANGRY',
  '훌쩍슬픔': 'SAD_CRIES',
};

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
    //          state: 음성 모드 참조 상태           //
    const [isVoiceMode, setIsVoiceMode] = useState(false);

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
                <div className='bakery-counsel-bot-chat-title'>
                    {isVoiceMode ? '음성상담' : '채팅상담'}
                </div>
                <FontAwesomeIcon icon={faMicrophoneLines} className="mic-icon" onClick={() => setIsVoiceMode(true)}/>
                <FontAwesomeIcon icon={faComments} className="chat-icon" onClick={() => setIsVoiceMode(false)}/>
                <div className='icon-button' onClick={onCloseButtonClickHandler}>
                    <div className='icon close-icon'></div>
                </div> 
            </div>
            <div className='bakery-counsel-bot-chat-middle'>
                {isVoiceMode ? (
                    <div className='bakery-counsel-bot-voice-counsel-box'>
                        <Recorder/>
                    </div>
                   
                    ) : (
                        <div className='bakery-counsel-bot-chat-counsel-box'>
                            <div className='bakery-counsel-bot-chat-counsel-container'>
                                {chatLog.map((chat, index) => (
                                    <div key={index} className={`chat-bubble ${chat.sender}`}>
                                        <span className="chat-message">{chat.message}</span>
                                        {chat.sender === 'bot' && chat.emotion && (
                                        <div className="chat-emotion-wrapper">
                                            <div className={`chat-emotion-icon ${emotionMap[chat.emotion || '기본스마일']}`} />
                                            
                                        </div>
                                        )}
                                    </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            <div className='bakery-counsel-bot-chat-bottom'>
                <div className='bakery-counsel-bot-chat-input-box'>
                    <div className='bakery-counsel-bot-chat-input-container'>
                        <textarea ref={chatQuestionRef} className='bakery-counsel-bot-chat-textarea' placeholder='무엇이든 물어보세요' value={chatQuestion} onChange={onChatQuestionChangeHandler} onKeyDown={onChatKeyDownHandler} disabled={isVoiceMode}/>
                  
                    </div>
                </div>
            </div> 
        </div>
    )
}
