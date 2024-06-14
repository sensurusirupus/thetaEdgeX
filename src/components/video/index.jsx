import React from "react";
import { Link } from "react-router-dom";
import { IconUpload, IconVideo, IconLivePhoto } from "@tabler/icons-react";

const Video = () => {
  return (
    <div className="p-6 bg-[#131722] min-h-screen text-white">
      <div className="flex flex-col items-center justify-center mt-0">
        <img src="/theta.png" width={95} className="mb-1" />
        <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-3">
          Theta Video Services
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <Link
          to="/upload-video"
          className="text-white shadow-md hover:bg-[#19c99d] bg-[#1f2331] rounded-lg py-6 flex flex-col items-center justify-center"
        >
          <IconUpload size={40} />
          <span className="mt-2">Upload Video</span>
        </Link>
        <Link
          to="/all-videos"
          className="text-white shadow-md hover:bg-[#19c99d] bg-[#1f2331] rounded-lg py-6 flex flex-col items-center justify-center"
        >
          <IconVideo size={40} />
          <span className="mt-2">All Videos</span>
        </Link>
        <Link
          to="/start-stream"
          className="text-white shadow-md hover:bg-[#19c99d] bg-[#1f2331] rounded-lg py-6 flex flex-col items-center justify-center"
        >
          <IconLivePhoto size={40} />
          <span className="mt-2">Start a Stream</span>
        </Link>
      </div>
    </div>
  );
};

export default Video;
