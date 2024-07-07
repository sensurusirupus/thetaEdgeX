import React, { useState } from "react";
import { IconArrowLeft, IconUpload } from "@tabler/icons-react";
import { useHistory } from "react-router-dom";

function SketchTo3D() {
  const [endpoint, setEndpoint] = useState(
    "https://sketchto3dv6pe3ds987-86ca34f902ccefbb.tec-s1.onthetaedgecloud.com/"
  );
  const [image, setImage] = useState(null);
  const [converted3D, setConverted3D] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleConvert = () => {
    if (!endpoint || !image) {
      alert("Please provide both the endpoint and an image.");
      return;
    }

    try {
      setIsLoading(true);
      // Simulate an API call with a 5000 milliseconds delay
      setTimeout(() => {
        setConverted3D("/2d.png"); // Adjust the path to the correct location of your image
        setIsLoading(false);
        console.log("Conversion simulated successfully");
      }, 5000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      alert("Conversion failed. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-[#131722] min-h-screen text-white">
      <button
        onClick={() => history.goBack()}
        className="bg-[#1f2331] rounded-full text-white flex items-center transition duration-300 mb-4"
      >
        <IconArrowLeft size={20} className="m-2" />
      </button>
      <img src="/icon.svg" width={65} alt="Icon" />
      <h1 className="text-2xl font-bold mb-4">Sketch to 3D (Theta)</h1>
      <p className="mb-6 font-Inter">
        Theta Labs' Sketch to 3D model uses advanced AI to convert hand-drawn
        sketches into 3D digital objects, aiding fields like animation, gaming,
        and design.
      </p>
      <div className="mb-4">
        <label className="block mb-2">Endpoint URL:</label>
        <input
          type="text"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          className="p-2 bg-[#1f2331] focus:outline-none text-white w-full rounded-md"
          placeholder="Enter endpoint URL"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Upload Sketch:</label>
        <div className="flex items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="upload-sketch"
          />
          <label htmlFor="upload-sketch" className="cursor-pointer">
            <IconUpload size={38} className="text-white" />
          </label>
          {image && (
            <div className="ml-4">
              <img
                src={URL.createObjectURL(image)}
                alt="Original Sketch"
                className="w-24 h-24 object-cover rounded-md"
              />
            </div>
          )}
        </div>
      </div>
      <button
        onClick={handleConvert}
        className="bg-blue-500 w-full text-white px-4 py-2 rounded-md mb-6"
      >
        {isLoading ? "Generating....." : " Convert to 3D"}
      </button>
      <div className="flex">
        {image && (
          <div className="w-1/2 p-2">
            <h2 className="text-lg font-bold mb-2">Original Sketch</h2>
            <img
              src={URL.createObjectURL(image)}
              alt="Original Sketch"
              className="w-full rounded-md"
            />
          </div>
        )}
        {converted3D && (
          <div className="w-1/2 p-2">
            <h2 className="text-lg font-bold mb-2">Converted 3D Model</h2>
            <img
              src={converted3D}
              alt="Converted 3D Model"
              className="w-full rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SketchTo3D;
