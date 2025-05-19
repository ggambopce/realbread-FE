import { useEffect, useRef, useState } from "react";
import axios from "axios";
import './style.css'

//          component: 상담 봇 컴포넌트          //
export default function Recorder() {
  const [recording, setRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // 응답 처리 중 여부 추가
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
          setRecording(false);
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
  };

  //          render: 상담 봇 컴포넌트 랜더링          //
  return (
    <div id='main-recoder-wrapper'>
      <div id='main-counselbot-container'>
        <div className="main-emotion-recoder-box">
          {/* 상태 텍스트 */}
          <p className="recorder-status-text">
            {recording
              ? "말씀 중... 손을 떼면 응답이 재생됩니다"
              : isProcessing
              ? "응답 중입니다..."
              : "저를 누르고 말해보세요"}
          </p>
        <button
          className={`emotion-button ${recording ? 'recording' : ''} ${isProcessing ? 'processing' : ''}`}
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
          disabled={isProcessing} // 응답 중에는 막기
        >
          <div className={`emotion-icon ${emotion || 'BASIC_SMILE'}`} />
        </button>
      </div>

      {audioUrl && (
        <div style={{ marginTop: '20px' }}>
          <p>상담 응답 오디오</p>
          <audio controls autoPlay src={audioUrl} />
          {emotion && (
            <div style={{ marginTop: '10px' }}>
              <p>감정: {emotion}</p>
            </div>
          )}
        </div>
      )}
      </div>
     
    </div>
    
  );
}