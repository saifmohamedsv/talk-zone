import { useEffect } from "react";
import PropTypes from "prop-types";
import useAppStore from "../store/store";

const ChatOptions = ({ chatId, socket }) => {
  const { setModal } = useAppStore();

  const makePrivate = () => {
    const token = localStorage.getItem("token");
    socket.emit("makePrivate", { chatId, token });
  };

  const inviteUsers = () => {
    const token = localStorage.getItem("token");

    setModal({
      show: true,
      children: (
        <>
          <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">
            Enter the email of the user you want to invite
          </label>
          <input
            type="text"
            id="invitedEmail"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g. saif@gmail.com"
            required
          />
        </>
      ),
      onClick: () => {
        const invitedUser = document.getElementById("invitedEmail").value;
        socket.emit("inviteUsers", { chatId, token, invitedUser });
        setModal({
          show: false,
        });
      },
    });
  };

  useEffect(() => {}, []);

  return (
    <div className="flex gap-4">
      <button onClick={inviteUsers} className="bg-indigo-400 text-white px-2 py-1.5 text-sm rounded-md">
        Invite
      </button>
      <button onClick={makePrivate} className="bg-indigo-600 text-white px-2 py-1.5 text-sm rounded-md">
        Make Private
      </button>
    </div>
  );
};

export default ChatOptions;

ChatOptions.propTypes = {
  socket: PropTypes.func,
  chatId: PropTypes.string,
};
