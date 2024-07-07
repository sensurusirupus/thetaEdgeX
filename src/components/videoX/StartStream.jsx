import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
const StartStream = () => {
  const [id, setId] = useState("");
  const [secret, setSecret] = useState("");
  const [streamName, setStreamName] = useState("");
  const [streamResponse, setStreamResponse] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [streams, setStreams] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const storedStreams = JSON.parse(localStorage.getItem("streams")) || [];
    setStreams(storedStreams);
  }, []);

  const saveStreamsToLocalStorage = (streams) => {
    localStorage.setItem("streams", JSON.stringify(streams));
  };

  const startStream = async () => {
    if (!id || !secret || !streamName) {
      alert("Please provide ID, Secret, and Stream Name.");
      return;
    }

    setIsCreating(true);

    try {
      const response = await axios.post(
        "https://api.thetavideoapi.com/stream",
        { name: streamName },
        {
          headers: {
            "x-tva-sa-id": id,
            "x-tva-sa-secret": secret,
            "Content-Type": "application/json",
          },
        }
      );

      setStreamResponse(response.data);
      const newStream = response.data.body;
      const newStreams = [...streams, newStream];
      setStreams(newStreams);
      saveStreamsToLocalStorage(newStreams);
      retrieveStreamDetails(newStream.id);
    } catch (error) {
      console.error("Error creating stream:", error);
      alert("Failed to create stream. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const retrieveStreamDetails = async (streamId) => {
    try {
      const response = await axios.get(
        `https://api.thetavideoapi.com/stream/${streamId}`,
        {
          headers: {
            "x-tva-sa-id": id,
            "x-tva-sa-secret": secret,
          },
        }
      );

      const updatedStream = response.data.body;
      const updatedStreams = streams.map((stream) =>
        stream.id === updatedStream.id ? updatedStream : stream
      );
      setStreams(updatedStreams);
      saveStreamsToLocalStorage(updatedStreams);
    } catch (error) {
      console.error("Error retrieving stream details:", error);
      alert("Failed to retrieve stream details. Please try again.");
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
      <h1 className="text-2xl font-bold mb-4">Start Stream</h1>
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
        <label className="block mb-2">Stream Name:</label>
        <input
          type="text"
          value={streamName}
          onChange={(e) => setStreamName(e.target.value)}
          className="p-2 bg-[#1f2331] text-white w-full rounded-md"
          placeholder="Enter Stream Name"
        />
      </div>
      <button
        onClick={startStream}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        disabled={isCreating}
      >
        {isCreating ? "Creating..." : "Start Stream"}
      </button>
      {streamResponse && (
        <div className="bg-[#1f2331] p-4 rounded-md mt-4">
          <h3 className="text-lg font-bold mb-2">Stream Created</h3>
          <p>Stream ID: {streamResponse.body.id}</p>
          <p>Status: {streamResponse.body.status}</p>
          <p>
            Please check back later for stream details. or click on this link to
            view: {`https://www.thetaedgecloud.com/dashboard/video/livestreams`}
          </p>
        </div>
      )}
      <div className="bg-[#1f2331] p-4 rounded-md mt-4">
        <h3 className="text-lg font-bold mb-2">All Streams</h3>
        {streams.length > 0 ? (
          streams.map((stream) => (
            <div key={stream.id} className="mb-2">
              <div className="flex justify-between items-center">
                <div>
                  <p>ID: {stream.id}</p>
                  <p>Name: {stream.name}</p>
                  <p>Status: {stream.status}</p>
                  {stream.stream_server && (
                    <>
                      <p>Stream Server: {stream.stream_server}</p>
                      <p>Stream Key: {stream.stream_key}</p>
                    </>
                  )}
                </div>
                <button
                  onClick={() => retrieveStreamDetails(stream.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md"
                >
                  Refresh
                </button>
              </div>
              {stream.player_uri && (
                <iframe
                  src={stream.player_uri}
                  border="0"
                  width="100%"
                  height="150px"
                  allowFullScreen
                />
              )}
              <hr className="my-2" />
            </div>
          ))
        ) : (
          <p>No streams found.</p>
        )}
      </div>
    </div>
  );
};

export default StartStream;
