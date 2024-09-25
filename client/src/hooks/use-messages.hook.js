import { useEffect } from "react";

const useMessages = ({ socket, chatId, setMessages }) => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!socket) return;
    socket.on("getMessages", (messages) => {
      setMessages(messages);
    });
    socket.emit("getMessages", { chatId, token });
  }, [socket, chatId]);
};

export default useMessages;
