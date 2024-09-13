import PropTypes from "prop-types";

export function MesssageCard({ message }) {
  return (
    <div className="flex mb-4 cursor-pointer">
      <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
        <img
          src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=SM&font=Lato"
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
      <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
        <p className="text-gray-700">{message.text}</p>
      </div>
      <small className="ms-2 mt-5 text-sm">
        {new Date(message.timestamp).toLocaleTimeString()}
      </small>
    </div>
  );
}
MesssageCard.propTypes = {
  message: PropTypes.object,
};
