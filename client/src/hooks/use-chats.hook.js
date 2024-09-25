import { useState } from "react";
import { useEffect } from "react";

const useChats = ({ socket }) => {
  const [chats, setChats] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!socket) return;
    socket.on("getChats", (chats) => {
      setChats(chats);
    });
    socket.emit("getChats", { token });
  }, [socket, token]);

  return { chats };
};

export default useChats;
