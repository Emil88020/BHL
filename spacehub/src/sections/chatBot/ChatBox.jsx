import React, { useState } from "react";
import "./chatBox.css";
import { Link } from "react-router-dom";

// Make sure your chat box also handles SpeechRecognition
const ChatBox = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  // Handle sending messages (text and audio)
  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Add the user's message
    const newMessages = [...messages, { sender: "user", text: inputValue }];
    setMessages(newMessages);

    // Clear input field
    setInputValue("");

    // Send the user's message to GPT and get a response
    const gptResponse = await getGptResponse(inputValue);
    setMessages([...newMessages, { sender: "bot", text: gptResponse }]);
  };

  // Function to handle speech recognition
  const startRecording = () => {
    if (isRecording) return;

    // Initialize SpeechRecognition API for capturing audio
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US"; // Adjust to desired language
    recognition.start();

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setInputValue(speechText);
      handleSend();
      setIsRecording(false);
    };

    recognition.onerror = (error) => {
      console.error("Speech recognition error:", error);
      setIsRecording(false);
    };
  };

  // Get GPT response (simulating here for now)
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
          Back<span></span>
        </button>
      </Link>
      {/* Chat messages area */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button type="button" className="send-button" onClick={handleSend}>
          Send
        </button>
        <button
          type="button"
          className="mic-button"
          onClick={startRecording}
          disabled={isRecording}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 14C11.1667 14 10.4583 13.7083 9.875 13.125C9.29167 12.5417 9 11.8333 9 11V5C9 4.16667 9.29167 3.45833 9.875 2.875C10.4583 2.29167 11.1667 2 12 2C12.8333 2 13.5417 2.29167 14.125 2.875C14.7083 3.45833 15 4.16667 15 5V11C15 11.8333 14.7083 12.5417 14.125 13.125C13.5417 13.7083 12.8333 14 12 14ZM11 21V17.925C9.26667 17.6917 7.83333 16.9167 6.7 15.6C5.56667 14.2833 5 12.75 5 11H7C7 12.3833 7.48767 13.5627 8.463 14.538C9.43833 15.5133 10.6173 16.0007 12 16C13.3827 15.9993 14.562 15.5117 15.538 14.537C16.514 13.5623 17.0013 12.3833 17 11H19C19 12.75 18.4333 14.2833 17.3 15.6C16.1667 16.9167 14.7333 17.6917 13 17.925V21H11Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
