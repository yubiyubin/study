import { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import "./ChatMessages.css";

function useAutoScroll(dependencies) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;

    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [dependencies]);

  return chatMessagesRef;
}

function ChatMessages({ chatMessages }) {
  //const [chatMessages, setChatMessages] = array;
  // //current data
  // const chatMessages = array[0];
  // //updater function
  // const setChatMessages = array[1];
  const chatMessagesRef = useAutoScroll([chatMessages]);

  return (
    <div ref={chatMessagesRef} className="chat-messages-container">
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  );
}

export default ChatMessages;
