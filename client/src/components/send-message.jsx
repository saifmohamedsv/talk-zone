import PropTypes from "prop-types";

export function SendMessage({ socket, sender, messages, setMessages }) {
  const sendMessage = () => {
    const message = document.getElementById("new-message").value;
    if (message && message.length > 0) {
      document.getElementById("new-message").value = "";
      const newMessage = {
        id: message.length + 1,
        text: message,
        sender,
        timestamp: new Date().getTime(),
      };
      socket.emit("message", newMessage);
      setMessages((prev) => [...prev, newMessage]);
    }
  };

  return (
    <>
      <textarea
        className="border-2 p-2"
        placeholder="Write your message."
        id="new-message"
      ></textarea>
      <button
        onClick={sendMessage}
        className="w-24 bg-red-300 justify-self-end"
        id="send-message"
      >
        Send
      </button>
    </>
  );
}

SendMessage.propTypes = {
  sender: PropTypes.string,
  setMessages: PropTypes.func,
  socket: PropTypes.func,
  messages: PropTypes.array,
};
