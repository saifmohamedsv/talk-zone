import PropTypes from "prop-types";

export function MesssageCard({ message }) {
  const sender = localStorage.getItem("userId");
  const isSender = sender === message.sender;
  console.log(sender);
  console.log(message.sender);
  console.log(message);

  return (
    <div className={`flex place-items-center mb-4 cursor-pointer gap-2 ${isSender ? "flex-row" : "flex-row-reverse"}`}>
      <div className="w-9 h-9 rounded-full flex items-center justify-center">
        <img
          src={`https://placehold.co/200x/ffa8e4/ffffff.svg?text=${message.sender}&font=Lato`}
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
      <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
        <p className="text-gray-700">{message.text}</p>
      </div>
      <small className="mt-5 text-[0.5rem] place-items-center">
        {new Date(message.timestamp).toLocaleTimeString()}
      </small>
    </div>
  );
}
MesssageCard.propTypes = {
  message: PropTypes.object,
};
