import { useRef, useState } from "react";
import axios from "axios";

export default function Recorder() {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' }); // 브라우저에 따라 type: audio/wav, audio/ogg 도 가능
      audioChunksRef.current = [];

      const formData = new FormData();
      formData.append('audioFile', audioBlob, 'recording.webm');

      try {
        const response = await axios.post('/api/stt', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log('변환된 텍스트:', response.data);
      } catch (error) {
        console.error('STT 변환 실패:', error);
      }
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div>
      <button onClick={startRecording} disabled={recording}>녹음 시작</button>
      <button onClick={stopRecording} disabled={!recording}>녹음 종료</button>
    </div>
  );
}
