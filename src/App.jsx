import React, { useEffect, useState } from "react";
import { socket } from "./socket";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("send_message", message);
    setMessages([...messages, message]);
    setMessage("");
  };

  return (
    <div className="h-screen bg-gray-900 flex items-center justify-center text-white">
      <div className="w-full max-w-md">
        <div className="bg-white text-black p-4 h-80 overflow-y-auto rounded">
          {messages.map((msg, i) => (
            <div key={i} className="my-2">{msg}</div>
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
