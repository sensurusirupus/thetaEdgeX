import React from "react";
import { useHistory } from "react-router-dom";
import {
  IconBraces,
  IconBrandOpenai,
  IconBrandMeta,
  IconArrowLeft,
} from "@tabler/icons-react";

function Chains() {
  const history = useHistory();

  const navigateTo = (path) => {
    history.push(path);
  };

  return (
    <div className="p-6 bg-[#131722] min-h-screen text-white">
      <button
        onClick={() => history.goBack()}
        className=" bg-[#1f2331] rounded-full text-white   flex items-center transition duration-300"
      >
        <IconArrowLeft size={20} className="m-2" />
      </button>{" "}
      <div className="flex flex-col items-center justify-center mt-0">
        <img src="/theta.png" width={95} />
        <h1 className="text-3xl font-bold pb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          EdgeCloud
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div
          className="bg-[#1f2331] p-4 rounded-md text-center cursor-pointer hover:bg-[#19c99d]"
          onClick={() => navigateTo("/sketch-to-3d")}
        >
          {/* <IconBraces size={40} className="mx-auto mb-2" /> */}
          <img src="/theta.png" className="w-14 mx-auto mb-2" />
          <div>Sketch to 3D</div>
        </div>
        <div
          className="bg-[#1f2331] p-4 rounded-md text-center cursor-pointer hover:bg-[#19c99d]"
          onClick={() => navigateTo("/whisper")}
        >
          <IconBrandOpenai size={40} className="mx-auto mb-6" />
          <div>Whisper</div>
        </div>
        <div
          className="bg-[#1f2331] p-4 rounded-md text-center cursor-pointer hover:bg-[#19c99d]"
          onClick={() => navigateTo("/chatgpt")}
        >
          <IconBrandOpenai size={40} className="mx-auto mb-6" />
          <div>ChatGPT</div>
        </div>
        <div
          className="bg-[#1f2331] p-4 rounded-md text-center cursor-pointer hover:bg-[#19c99d]"
          onClick={() => navigateTo("/llama")}
        >
          <IconBrandMeta size={40} className="mx-auto mb-6" />
          <div>Llama 3 8B</div>
        </div>
      </div>
    </div>
  );
}

export default Chains;
