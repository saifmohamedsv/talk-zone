import PropTypes from "prop-types";

export function SendMessage({ socket, setMessages, chatId }) {
  const sendMessage = () => {
    const userId = localStorage.getItem("userId");
    const message = document.getElementById("new-message").value;
    if (message && message.length > 0) {
      document.getElementById("new-message").value = "";
      const newMessage = {
        text: message,
        chatId: chatId,
        sender: userId,
      };
      const token = localStorage.getItem("token");
      socket.emit("message", { message: newMessage, token });
      setMessages((prev) => [...prev, newMessage]);
    }
  };

  return (
    <div className="flex items-center">
      <input
        className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
        placeholder="Write your message."
        id="new-message"
        type="text"
      />
      <button onClick={sendMessage} className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2" id="send-message">
        Send
      </button>
    </div>
  );
}

SendMessage.propTypes = {
  sender: PropTypes.string,
  setMessages: PropTypes.func,
  socket: PropTypes.any,
  messages: PropTypes.array,
  chatId: PropTypes.string,
};
