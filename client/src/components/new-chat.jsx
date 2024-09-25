import { v4 as uuidv4 } from "uuid";

export function NewChat() {
  const handleCreateNewChat = () => {
    const newChatId = uuidv4();
    window.location.href = `/?chatId=${newChatId}`;
  };
  return <button onClick={handleCreateNewChat}>New Chat</button>;
}
