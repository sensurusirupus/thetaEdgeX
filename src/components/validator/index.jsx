import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
function NodeValidator() {
  const [memory, setMemory] = useState("");
  const [cpu, setCpu] = useState("");
  const [disk, setDisk] = useState("");
  const [network, setNetwork] = useState("");
  const [isCompatible, setIsCompatible] = useState(null);
  const history = useHistory();

  const recommendedSpecs = {
    memory: 32, // GB
    cpu: 8, // cores
    disk: 2000, // GB
    network: 200, // Mbps
  };

  useEffect(() => {
    // Detecting memory (in GB)
    if (navigator.deviceMemory) {
      setMemory(navigator.deviceMemory * 4); // Approximation, can be browser dependent
    }

    if (navigator.hardwareConcurrency) {
      setCpu(navigator.hardwareConcurrency);
    }

    // Manual input for disk space
    // Detect network speed
    testNetworkSpeed();
  }, []);

  const testNetworkSpeed = async () => {
    const image = new Image();
    const startTime = new Date().getTime();
    const cacheBuster = "?nnn=" + startTime;

    image.onload = () => {
      const endTime = new Date().getTime();
      const duration = (endTime - startTime) / 1000;
      const bitsLoaded = 500000 * 8; // Assuming 500KB image
      const speedBps = (bitsLoaded / duration).toFixed(2);
      const speedKbps = (speedBps / 1024).toFixed(2);
      const speedMbps = (speedKbps / 1024).toFixed(2);

      setNetwork(speedMbps);
    };

    image.onerror = () => {
      setNetwork("Failed to determine network speed");
    };

    image.src = "https://www.google.com/images/phd/px.gif" + cacheBuster;
  };

  const checkCompatibility = () => {
    const nodeSpecs = {
      memory: parseFloat(memory),
      cpu: parseFloat(cpu),
      disk: parseFloat(disk),
      network: parseFloat(network),
    };

    const compatible =
      nodeSpecs.memory >= recommendedSpecs.memory &&
      nodeSpecs.cpu >= recommendedSpecs.cpu &&
      nodeSpecs.disk >= recommendedSpecs.disk &&
      nodeSpecs.network >= recommendedSpecs.network;

    setIsCompatible(compatible);
  };

  return (
    <div className="p-6 bg-[#131722] min-h-screen text-white">
      <button
        onClick={() => history.goBack()}
        className=" bg-[#1f2331] rounded-full text-white   flex items-center transition duration-300"
      >
        <IconArrowLeft size={20} className="m-2" />
      </button>{" "}
      <h1 className="text-3xl font-bold mb-8 text-center">
        Node Validator Checker
      </h1>
      <div className="space-y-6">
        <div>
          <label className="block mb-2 text-lg">Memory (GB):</label>
          <input
            type="number"
            value={memory}
            onChange={(e) => setMemory(e.target.value)}
            className="p-3 bg-[#1f2331] text-white w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Memory in GB"
          />
        </div>
        <div>
          <label className="block mb-2 text-lg">CPU (Cores):</label>
          <input
            type="number"
            value={cpu}
            onChange={(e) => setCpu(e.target.value)}
            className="p-3 bg-[#1f2331] text-white w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter CPU cores"
          />
        </div>
        <div>
          <label className="block mb-2 text-lg">Disk (GB):</label>
          <input
            type="number"
            value={disk}
            onChange={(e) => setDisk(e.target.value)}
            className="p-3 bg-[#1f2331] text-white w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Disk space in GB"
          />
        </div>
        <div>
          <label className="block mb-2 text-lg">Network (Mbps):</label>
          <input
            type="number"
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            className="p-3 bg-[#1f2331] text-white w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Network speed in Mbps"
          />
        </div>
        <button
          onClick={checkCompatibility}
          className="bg-blue-500 w-full text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Check Compatibility
        </button>
        {isCompatible !== null && (
          <div
            className={`mt-4 p-4 rounded-md text-center ${
              isCompatible ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {isCompatible
              ? "Your node is compatible as a validator."
              : "Your node does not meet the minimum requirements for a validator."}
          </div>
        )}
      </div>
    </div>
  );
}

export default NodeValidator;
