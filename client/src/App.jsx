import { useEffect, useState } from "react";
import { useUsernameHook } from "./hooks/use-sender-name.hook";
import { useSocket } from "./hooks/use-socket.hook";
import { SendMessage } from "./components/send-message";
import { MessagesList } from "./components/messages-list";

function App() {
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const { socket } = useSocket();
  const { sender } = useUsernameHook();

  useEffect(() => {
    if (socket !== null) {
      socket.on("message", (message) => {
        setMessages((prev) => [...prev, message]); // Add the new message to the messages array
      });
    }
  }, [socket]);

  return (
    <div>
      <div className="float-right m-4">
        <button>New Chat</button>
      </div>
      <div className="grid grid-cols-1">
        <div className="mt-10 scroll-auto overflow-y-auto max-h-[70vh]">
          <MessagesList messages={messages} />
        </div>
        <div className="p-4 mt-10 grid grid-cols-2 absolute bottom-0 left-0 right-0">
          <SendMessage
            socket={socket}
            sender={sender}
            messages={messages}
            setMessages={setMessages}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
