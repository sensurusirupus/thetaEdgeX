import React from "react";
import { useHistory } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
function Llama() {
  const history = useHistory();

  return (
    <div className="p-4 bg-[#131722] min-h-screen text-white">
      <button
        onClick={() => history.goBack()}
        className=" bg-[#1f2331] rounded-full text-white   flex items-center transition duration-300"
      >
        <IconArrowLeft size={20} className="m-2" />
      </button>{" "}
      <h1 className="text-2xl font-bold">Llama 3 8B (Meta)</h1>
      <p>Coming soon.</p>
    </div>
  );
}

export default Llama;
