import { useRef, useState } from "react";
import axios from "axios";

export default function Recorder() {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    if (recording) return; // 이미 녹음 중이면 중단

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    audioChunksRef.current = []; // 시작할 때 초기화


    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
      audioChunksRef.current.push(e.data);
      }
    };

      mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      const audioFile = new File([audioBlob], 'recording.webm', { type: 'audio/webm' });
      const formData = new FormData();
      formData.append('audioFile', audioFile); // Blob이 아니라 File로 지정

      try {
        const response = await axios.post('/api/edu-bot/counsel', formData, {
          responseType: 'blob',
        });

        const responseBlob = new Blob([response.data], { type: 'audio/mpeg' });
        const audioURL = URL.createObjectURL(responseBlob);
        setAudioUrl(audioURL);
      } catch (error) {
        console.error('상담 응답 처리 실패:', error);
      }

      // stream도 종료
      stream.getTracks().forEach(track => track.stop());
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (!recording) return;
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div id='main-recoder-wrapper'>
      <div className="main-recoder-box">
        <button onClick={startRecording} disabled={recording}>녹음 시작</button>
        <button onClick={stopRecording} disabled={!recording}>녹음 종료</button>
      </div>

      {audioUrl && (
        <div style={{ marginTop: "20px" }}>
          <p>상담 응답 오디오</p>
          <audio controls src={audioUrl} />
        </div>
      )}
    </div>
  );
}
