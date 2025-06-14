// /sections/DoctorChatPage.jsx
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const socket = io("https://health-hive-8tv1.onrender.com");

function DoctorChatPage() {
  const doctorId = parseInt(localStorage.getItem("doctorId"), 10); // assuming doctor is logged in
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.emit("register", { userId: doctorId, role: "doctor" });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
      setCurrentUserId(msg.senderId);
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!newMsg.trim() || currentUserId === null) return;
    const msgData = { senderId: doctorId, receiverId: currentUserId, message: newMsg };
    socket.emit("sendMessage", msgData);
    setMessages((prev) => [...prev, { ...msgData, timestamp: new Date().toISOString() }]);
    setNewMsg('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-green-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-lg space-y-4">
        <h2 className="text-xl font-bold text-center text-green-600">Doctor Chat Panel</h2>
        <div className="h-96 overflow-y-auto border rounded-md p-3 bg-gray-50 space-y-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-xs p-2 rounded-lg ${
                msg.senderId === doctorId
                  ? 'ml-auto bg-green-300'
                  : 'mr-auto bg-indigo-200'
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
            placeholder="Reply..."
            className="flex-1 border border-gray-300 rounded-md px-3 py-2"
          />
          <button onClick={sendMessage} className="bg-green-500 text-white px-4 py-2 rounded-md">Send</button>
        </div>
      </div>
    </div>
  );
}

export default DoctorChatPage;
