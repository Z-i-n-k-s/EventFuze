import { useRef } from "react";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";

const ChatForm = ({chatHistory,setChatHistory, generateBotResponse}) => {
  const inputRef = useRef();
 
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;

    console.log("User message:", userMessage);

    inputRef.current.value = ""; 

    setChatHistory((history) => [...history, { role: "user", text: userMessage }]);
    setTimeout(()=>{
        setChatHistory((history) => [...history, { role: "model", text: "Thinking..............." }]);
   generateBotResponse([...chatHistory, { role: "user", text: userMessage }]);
    },600);
    
};


  

  return (
    <form className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}   // 🔥 attach the ref here
        type="text"
        className="message-input"
        placeholder="Type your message..."
        required
      />
      <button
        type="submit"
        className="w-10 h-10 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center rounded-xl shadow-md transition-colors"
      >
        <MdOutlineKeyboardDoubleArrowUp className="w-6 h-6" />
      </button>
    </form>
  );
};

export default ChatForm;
