import React, { useState, useEffect, useRef } from "react";
import "./chatBox.css";
import { Link } from "react-router-dom";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [inputValue, setInputValue] = useState("");

  // Create a reference to the chat messages container
  const chatMessagesRef = useRef(null);

  // Scroll to the bottom of the chat messages whenever a new message is added
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]); // This will run whenever the messages change

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Add the user's message
    const newMessages = [...messages, { sender: "user", text: inputValue }];
    setMessages(newMessages);

    // Clear input field
    setInputValue("");

    // Send the user's message to GPT and get a response (replace with your GPT integration)
    const gptResponse = await getGptResponse(inputValue);
    setMessages([...newMessages, { sender: "bot", text: gptResponse }]);
  };

  const getGptResponse = async (message) => {
    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      return data.response || "No response from GPT.";
    } catch (error) {
      console.error("Error fetching GPT response:", error);
      return "Error fetching GPT response.";
    }
  };

  return (
    <div className="chat-container">
      <Link to="/">
        <button type="button" id="cta-btn" className="back-button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 12L4 12M4 12L10 6M4 12L10 18"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span></span>
        </button>
      </Link>

      {/* Chat messages area */}
      <div className="chat-messages" ref={chatMessagesRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Chat input area */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button type="button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
