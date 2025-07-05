import React, { useEffect, useState } from "react";
import { socket } from "./socket";
import { v4 as uuidv4 } from "uuid"; // install uuid

// npm install uuid

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userId] = useState(uuidv4()); // Unique ID per user

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    const msgData = {
      id: uuidv4(),
      sender: userId,
      content: message,
    };
    socket.emit("send_message", msgData);
    setMessages([...messages, msgData]);
    setMessage("");
  };

  return (
    <div className="h-screen bg-gray-900 flex items-center justify-center text-white">
      <div className="w-full max-w-md">
        <div className="bg-white text-black p-4 h-80 overflow-y-auto rounded">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`my-2 p-2 rounded max-w-[70%] ${
                msg.sender === userId
                  ? "bg-purple-600 text-white ml-auto text-right"
                  : "bg-gray-300 text-black mr-auto text-left"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            className="flex-grow p-2 rounded-l bg-gray-200 text-black"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="bg-purple-600 px-4 rounded-r"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
