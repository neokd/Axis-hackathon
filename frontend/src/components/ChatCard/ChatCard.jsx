import React from "react";
import Chats from "./Chats";

const ChatCard = ({ handleshowchat }) => {
  return (
    <div className="fixed bottom-5 right-5 bg-white rounded-lg w-72 h-96 shadow-lg border border-gray-200 overflow-hidden ">
      <div className="flex p-2 bg-sky-500  text-gray-50 space-x-4 justify-between">
        <div>
          <img
            className="w-12 h-12 rounded-full"
            src="/src/assets/bot.jpeg"
            alt=""
          />
        </div>
        <div className="py-2 font-bold">chatBot</div>
        <div onClick={handleshowchat} className="icon py-2 cursor-pointer">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="h-full overflow-auto">
        <Chats />
      </div>
    </div>
  );
};

export default ChatCard;
