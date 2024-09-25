import useChats from "../hooks/use-chats.hook";
import { NewChat } from "./new-chat";
import PropTypes from "prop-types";

const SideBar = ({ socket }) => {
  const { chats } = useChats({ socket });

  return (
    <div className="w-1/4 shadow-lg bg-white border-e border-slate-600">
      <header className="p-4 flex justify-between items-center bg-indigo-600 text-white">
        <h1 className="text-2xl font-semibold">Talk Zone</h1>
        <div className="flaot-right">
          <NewChat />
        </div>
      </header>

      <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
        {chats?.map((chat) => (
          <div key={chat.id} className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
              <img
                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <a href={`/?chatId=${chat.name}`}>
                <h2 className="text-lg font-semibold">{chat.name}</h2>
              </a>
              <p className="text-gray-600">Hoorayy!!</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;

SideBar.propTypes = {
  chats: PropTypes.array,
  socket: PropTypes.any,
};
