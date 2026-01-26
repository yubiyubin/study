import { useState } from "react";
import { Chatbot } from "supersimpledev";
import LoadingImage from "../assets/loading-spinner.gif";
import "./ChatInput.css";

export function ChatInput({ setChatMessages, chatMessages }) {
  //useState(초기상태)
  const [inputText, setInputText] = useState("");
  const [loadingState, setLoadingState] = useState(false);

  function saveInputText(event) {
    if (loadingState) {
      return;
    }
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (loadingState || inputText === "") {
      return;
    }

    const newChatMessages = [
      ...chatMessages,
      { message: inputText, sender: "user", id: crypto.randomUUID() },
    ];

    setChatMessages([
      ...newChatMessages,
      {
        message: <img className="loadingImg" src={LoadingImage} />,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    setLoadingState(true);
    setInputText("");
    const response = await Chatbot.getResponseAsync(inputText);
    setLoadingState(false);

    setChatMessages([
      ...newChatMessages,
      { message: response, sender: "robot", id: crypto.randomUUID() },
    ]);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
    if (event.key === "Escape") {
      setInputText("");
    }
  }

  return (
    <div className="chat-input-container">
      <input
        value={inputText}
        onKeyDown={handleKeyDown}
        placeholder="send a message to CHATBOT"
        size="30"
        onChange={saveInputText}
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
    </div>
  );
}
