import ChatbotIcon from "./ChatbotIcon";
import "./Chatbot.css";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import ChatForm from "./ChatForm";
import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";

const ChatbotBody = ({ onClose }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const chatBodyRef = useRef(null);

  // Static bot response generator
  const generateBotResponse = async (history) => {
    const updateHistory = (botText) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..............."),
        { role: "model", text: botText }
      ]);
    };

    const lastMessage = history[history.length - 1]?.text || "";

    let botText = "I'm not sure how to respond to that.";
    if (lastMessage.toLowerCase().includes("hello")) {
      botText = "Hello! How can I assist you today?";
    } else if (lastMessage.toLowerCase().includes("help")) {
      botText = "Sure! I can help you. What do you need assistance with?";
    } else if (lastMessage.toLowerCase().includes("bye")) {
      botText = "Goodbye! Have a great day!";
    }

    updateHistory(botText);
    setChatHistory((prev) => [...prev, { role: "bot", text: botText }]);
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      requestAnimationFrame(() => {
        chatBodyRef.current.scrollTo({
          top: chatBodyRef.current.scrollHeight,
          behavior: "smooth"
        });
      });
    }
  }, [chatHistory]);

  return (
    <div ref={chatBodyRef} className="chatbot-container">
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <h2 className="logo-text">Chatbot</h2>
            <ChatbotIcon />
          </div>

          {/* Close button */}
          <button
            onClick={onClose} // 👈 will trigger parent close
            className="w-10 h-10 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center rounded-xl shadow-md transition-colors"
          >
            <MdKeyboardDoubleArrowDown className="w-6 h-6" />
          </button>
        </div>

        <div className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there 👋<br /> How can I help you today?
            </p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatbotBody;
