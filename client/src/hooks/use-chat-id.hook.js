import { useState } from "react";

const useChatId = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const [chatId] = useState(urlParams.get("chatId"));

  return chatId;
};

export default useChatId;
