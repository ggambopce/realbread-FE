import { useEffect, useRef, useState } from "react";
import axios from "axios";
import './style.css'

//          component: 상담 봇 컴포넌트          //
export default function Recorder() {
  const [recording, setRecording] = useState(false);
  //          state: 상담 서버 처리 상태          //
  const [isProcessing, setIsProcessing] = useState(false); // 응답 처리 중 여부 추가
  //          state: 상담 오디오 재생 상태          //
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [emotion, setEmotion] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    if (recording || isProcessing) return; // 녹음 중 또는 처리 중이면 중단


    setEmotion(null); // 이전 감정 초기화
    setAudioUrl(null); // 이전 응답 초기화

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      audioChunksRef.current = []; // 시작할 때 초기화

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
        audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        setIsProcessing(true);

        try {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const audioFile = new File([audioBlob], 'recording.webm', { type: 'audio/webm' });
          const formData = new FormData();
          formData.append('audioFile', audioFile); // Blob이 아니라 File로 지정

      
          const response = await axios.post('/api/edu-bot/counsel', formData, {
            responseType: 'blob',
          });

          const emotionHeader = response.headers['emotion']; // 감정 정보 추출
          setEmotion(emotionHeader); // 상태 저장

          const responseBlob = new Blob([response.data], { type: 'audio/mpeg' });
          const audioURL = URL.createObjectURL(responseBlob);
          setAudioUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev); // 이전 URL 정리
            return audioURL;
          });
        } catch (error) {
          console.error('상담 응답 처리 실패:', error);
        } finally {
          streamRef.current?.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
          mediaRecorderRef.current = null;
        
          setIsProcessing(false);
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
        console.error('녹음 시작 실패:', error);
      }
    };

  const stopRecording = () => {
    if (!recording) return;
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  //          render: 상담 봇 컴포넌트 랜더링          //
  return (
    <div id='main-recoder-wrapper'>
      <div id='main-counselbot-container'>
        <div className="main-emotion-recoder-box">
          <div className={`recoder-bubble-wrapper ${recording || isProcessing || isAudioPlaying ? 'active' : ''}`}>
            <button
              className={`emotion-button ${recording ? 'recording' : ''} ${isProcessing ? 'processing' : ''}`}
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
              onTouchStart={startRecording}
              onTouchEnd={stopRecording}
              disabled={isProcessing} // 응답 중에는 막기
            >
              <div className={`emotion-icon 
                ${isProcessing ? 'THINKING' : emotion || 'BASIC_SMILE'} 
                ${recording ? 'recording' : ''}
                ${isAudioPlaying ? 'talking' : ''}`} />
            </button>
            <div className="recorder-status-bubble">
              {/* 상태 텍스트 */}
              <p className="recorder-status-text">
                {recording
                  ? "말씀 중... 손을 떼면 상담이 시작됩니다"
                  : isProcessing
                  ? "생각 중입니다..."
                  : isAudioPlaying
                  ? "응답 중..."
                  : "저를 누르고 말해보세요"}
              </p>
            </div>
          </div>
          
      </div>

      {audioUrl && (
        <div className="audio-response-box">
          <audio controls autoPlay 
            src={audioUrl}
            onPlay={() => setIsAudioPlaying(true)}
            onEnded={() => setIsAudioPlaying(false)}
            onPause={() => setIsAudioPlaying(false)} 
          />
          {emotion && (
            <div className="emotion-label">
              감정: {emotion}
            </div>
          )}
        </div>
      )}
      </div>
     
    </div>
    
  );
}