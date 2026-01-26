import { useState } from "react";
import { ChatInput } from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import "./App.css";

function App() {
  const [chatMessages, setChatMessages] = useState([
    // { message: "hello chatbot", sender: "user", id: "id1" },
    // { message: "Hello! How can I help you?", sender: "robot", id: "id2" },
    // { message: "get me date", sender: "user", id: "id3" },
    // { message: "Today is January 22", sender: "robot", id: "id4" },
  ]);
  return (
    <div className="app-container">
      <p className="welcomeMessage">
        {chatMessages.length === 0
          ? "Welcome to the chatbot project! Send a message using the textbox below!"
          : ""}
      </p>
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;
