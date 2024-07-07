import React, { useState } from "react";
import { IconUpload } from "@tabler/icons-react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
function UploadVideo() {
  const [id, setId] = useState("");
  const [secret, setSecret] = useState("");
  const [file, setFile] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [videoId, setVideoId] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const history = useHistory();

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadVideo = async () => {
    if (!id || !secret || !file) {
      alert("Please provide ID, Secret, and select a file.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "https://api.thetavideoapi.com/upload",
        formData,
        {
          headers: {
            "x-tva-sa-id": id,
            "x-tva-sa-secret": secret,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadResponse(response.data);

      const uploadId = response.data.body.uploads[0].id;
      transcodeVideo(uploadId);
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const transcodeVideo = async (uploadId) => {
    try {
      const response = await axios.post(
        "https://api.thetavideoapi.com/video",
        {
          source_upload_id: uploadId,
          playback_policy: "public",
          nft_collection: "0x5d0004fe2e0ec6d002678c7fa01026cabde9e793",
          metadata: { key: "value" },
        },
        {
          headers: {
            "x-tva-sa-id": id,
            "x-tva-sa-secret": secret,
            "Content-Type": "application/json",
          },
        }
      );

      const videoId = response.data.body.videos[0].id;
      setVideoId(videoId);
      saveUploadedVideo(videoId);
    } catch (error) {
      console.error("Error transcoding video:", error);
      alert("Failed to transcode video. Please try again.");
    }
  };

  const saveUploadedVideo = (videoId) => {
    const storedVideos =
      JSON.parse(localStorage.getItem("uploadedVideos")) || [];
    const newUploadedVideos = [...storedVideos, videoId];
    localStorage.setItem("uploadedVideos", JSON.stringify(newUploadedVideos));
  };

  return (
    <div className="p-4 bg-[#131722] min-h-screen text-white">
      <button
        onClick={() => history.goBack()}
        className=" bg-[#1f2331] rounded-full text-white   flex items-center transition duration-300"
      >
        <IconArrowLeft size={20} className="m-2" />
      </button>{" "}
      <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
      <div className="mb-4">
        <label className="block mb-2">ID:</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="p-2 bg-[#1f2331] text-white w-full rounded-md"
          placeholder="Enter ID"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Secret Key:</label>
        <input
          type="text"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="p-2 bg-[#1f2331] text-white w-full rounded-md"
          placeholder="Enter Secret Key"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Select Video:</label>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileUpload}
          className="hidden"
          id="video-upload"
        />
        <label
          htmlFor="video-upload"
          className="cursor-pointer flex items-center justify-center bg-[#1f2331] p-4 rounded-md text-white"
        >
          <IconUpload size={40} />
          <span className="ml-2 ">Upload Video</span>
        </label>
        {file && <p className="mt-2">{file.name}</p>}
      </div>
      <button
        onClick={uploadVideo}
        className="bg-blue-500 w-full text-white px-4 py-2 rounded-md"
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Upload"}
      </button>
      {videoId && (
        <div className="bg-[#1f2331] p-4 rounded-md mt-4">
          <h3 className="text-lg font-bold mb-2">Processing</h3>
          <p>
            Your video is being processed. Please check back later to view it.
          </p>
        </div>
      )}
    </div>
  );
}

export default UploadVideo;
