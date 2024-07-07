import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
const AllVideos = () => {
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const history = useHistory();

  const loadUploadedVideos = () => {
    const storedVideos =
      JSON.parse(localStorage.getItem("uploadedVideos")) || [];
    setUploadedVideos(storedVideos);
  };

  useEffect(() => {
    loadUploadedVideos();
  }, []);

  return (
    <div className="p-4 bg-[#131722] min-h-screen text-white">
      <button
        onClick={() => history.goBack()}
        className=" bg-[#1f2331] rounded-full text-white   flex items-center transition duration-300"
      >
        <IconArrowLeft size={20} className="m-2" />
      </button>{" "}
      <h1 className="text-2xl font-bold mb-4">All Videos</h1>
      <div className="bg-[#1f2331] p-4 rounded-md">
        <h3 className="text-lg font-bold mb-2">Uploaded Videos</h3>
        {uploadedVideos.length > 0 ? (
          uploadedVideos.map((videoId, index) => (
            <div key={index} className="mb-2">
              <iframe
                src={`https://player.thetavideoapi.com/video/${videoId}`}
                border="0"
                width="100%"
                height="150px"
                allowFullScreen
              />
            </div>
          ))
        ) : (
          <p>No videos uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default AllVideos;
