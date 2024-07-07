import React, { useState, useEffect, useRef } from "react";
import { IconMicrophone, IconLoader, IconArrowLeft } from "@tabler/icons-react";
import { useHistory } from "react-router-dom";

function Whisper() {
  const [endpoint, setEndpoint] = useState("");
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef(null);
  const history = useHistory();

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (event) => {
        setAudioBlob(event.data);
      };
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    });
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const handleTranscribe = async () => {
    if (!endpoint || !audioBlob) {
      alert("Please provide both the endpoint and record audio.");
      return;
    }

    try {
      //   const app = await client(endpoint);
      //   const result = await app.predict("/predict", [audioBlob]);
      setTranscription("result.data");
    } catch (error) {
      console.error(error);
      alert("Transcription failed. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-[#131722] min-h-screen text-white">
      <button
        onClick={() => history.goBack()}
        className=" bg-[#1f2331] rounded-full text-white   flex items-center transition duration-300"
      >
        <IconArrowLeft size={20} className="m-2" />
      </button>{" "}
      <img src="/openai.png" width={65} className="mb-4" />
      <h1 className="text-2xl font-bold mb-4">Whisper (OpenAI)</h1>
      <p className="mb-6">
        OpenAI's Whisper model is an advanced ASR system designed to transcribe
        and understand audio from various sources and languages with high
        accuracy. It excels in noisy environments, distinguishing speakers, and
        translating languages, making it a powerful tool for diverse audio
        applications.
      </p>
      <div className="mb-4">
        <label className="block mb-2">Endpoint URL:</label>
        <input
          type="text"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          className="p-2 bg-[#1f2331] text-white w-full rounded-md"
          placeholder="Enter endpoint URL"
        />
      </div>
      <div className="mb-4 text-center">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`p-4 rounded-full ${
            isRecording ? "bg-red-500" : "bg-blue-500"
          } text-white flex items-center justify-center mx-auto`}
        >
          <IconMicrophone size={40} />
        </button>
        {isRecording && (
          <div className="mt-2">
            <IconLoader className="animate-spin" size={24} />
            <span className="ml-2">{recordingTime}s</span>
          </div>
        )}
      </div>
      <button
        onClick={handleTranscribe}
        className="bg-blue-500 w-full text-white px-4 py-2 rounded-md mb-6"
      >
        Transcribe Audio
      </button>
      {transcription && (
        <div className="bg-[#1f2331] p-4 rounded-md mt-4">
          <h3 className="text-lg font-bold mb-2">Transcription</h3>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
}

export default Whisper;
