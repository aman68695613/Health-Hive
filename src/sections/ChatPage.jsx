// // /sections/ChatPage.jsx
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io("https://health-hive-8tv1.onrender.com");

function ChatPage() {
  const { doctorId } = useParams();
  const userId = parseInt(localStorage.getItem("userId"), 10);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.emit("register", { userId, role: "patient" });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    const msgData = { senderId: userId, receiverId: parseInt(doctorId), message: newMsg };
    socket.emit("sendMessage", msgData);
    setMessages((prev) => [...prev, { ...msgData, timestamp: new Date().toISOString() }]);
    setNewMsg('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-lg space-y-4">
        <h2 className="text-xl font-bold text-center text-indigo-600">Chat with Doctor #{doctorId}</h2>
        <div className="h-96 overflow-y-auto border rounded-md p-3 bg-gray-50 space-y-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-xs p-2 rounded-lg ${
                msg.senderId === userId
                  ? 'ml-auto bg-indigo-200'
                  : 'mr-auto bg-green-200'
              }`}
            >
              <p>{msg.message}</p>
              <span className="block text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            placeholder="Type a message"
            className="flex-1 border border-gray-300 rounded-md px-3 py-2"
          />
          <button onClick={sendMessage} className="bg-indigo-500 text-white px-4 py-2 rounded-md">Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage; 