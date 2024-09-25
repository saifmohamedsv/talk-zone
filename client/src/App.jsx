import { Fragment, useEffect } from "react";
import { useSocket } from "./hooks/use-socket.hook";
import { SendMessage } from "./components/send-message";
import { MessagesList } from "./components/messages-list";
import useChatId from "./hooks/use-chat-id.hook";
import useAuth from "./hooks/use-auth.hook";
import useMessages from "./hooks/use-messages.hook";
import Login from "./components/login";
import SideBar from "./components/sidebar";
import ChatOptions from "./components/chat-options";
import { useState } from "react";
import useAppStore from "./store/store";
import Modal from "./components/common/modal";
import { useSenderName } from "./hooks/use-sender-name.hook";

function App() {
  const chatId = useChatId();
  const { socket } = useSocket({ chatId });
  const { isLoggedIn } = useAuth({ socket });
  const [messages, setMessages] = useState([]);
  const { modal } = useAppStore();
  const { sender } = useSenderName();

  useMessages({ socket, setMessages, chatId });

  useEffect(() => {
    if (socket !== null) {
      socket.on("message", (message) => {
        setMessages((prev) => [...prev, message]); // Add the new message to the messages array
      });
    }
  }, [socket]);

  return (
    <>
      {isLoggedIn && (
        <div className="flex h-screen overflow-hidden">
          <Fragment>
            <SideBar socket={socket} />

            <div className="flex-1 bg-gray-100">
              <header className="flex items-center justify-between bg-white p-4 text-gray-700">
                <h1 className="text-2xl font-semibold">{chatId || "General"}</h1>
                <ChatOptions chatId={chatId} socket={socket} />
              </header>

              <MessagesList messages={messages} />

              <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
                <SendMessage socket={socket} setMessages={setMessages} chatId={chatId} />
              </footer>
            </div>
          </Fragment>
        </div>
      )}
      {!isLoggedIn && (
        <div className="h-screen">
          <Login socket={socket} />
        </div>
      )}

      <Modal onClick={modal.onClick} show={modal.show}>
        {modal.children}
      </Modal>
    </>
  );
}

export default App;
