import React, { useState, useEffect } from "react";
import { OpenAI } from "openai";
import { useHistory } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

function ChatGPT() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { role: "user", content: input }];

    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: newMessages,
      });
      console.log("response", response);

      const reply = response.choices[0].message.content;

      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("Error fetching OpenAI response:", error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Error: Unable to get a response from OpenAI.",
        },
      ]);
    }

    setIsLoading(false);
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
      <h1 className="text-2xl font-bold mb-3">ChatGPT (OpenAI)</h1>
      <div className="bg-[#1f2331] p-4 rounded-md mb-4">
        <div
          id="chat-container"
          className="overflow-y-scroll h-64 p-2 border border-gray-600 rounded"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {isLoading && (
            <div className="mb-2 p-2 rounded bg-gray-700 text-white">
              Typing...
            </div>
          )}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-2 bg-[#2a2f3b] text-white rounded-l-md focus:outline-none"
            placeholder="Type your message here..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatGPT;
