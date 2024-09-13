import { MesssageCard } from "./messsage-card";
import PropTypes from "prop-types";

export function MessagesList({ messages }) {
  return (
    <>
      {messages.map((message) => (
        <MesssageCard message={message} key={message.id} />
      ))}
    </>
  );
}

MessagesList.propTypes = {
  messages: PropTypes.array,
};
