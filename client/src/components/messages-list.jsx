import { MesssageCard } from "./messsage-card";
import PropTypes from "prop-types";

export function MessagesList({ messages }) {
  return (
    <div className="h-screen overflow-y-auto p-4 pb-36">
      {messages?.map((message) => (
        <MesssageCard message={message} key={message.id} />
      ))}
    </div>
  );
}

MessagesList.propTypes = {
  messages: PropTypes.array,
  chatId: PropTypes.string,
  setMessages: PropTypes.func,
};
