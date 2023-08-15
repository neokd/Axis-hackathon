import React from "react";
import Chats from "./Chats";

const ChatCard = ({ handleshowchat }) => {
  return (
    <div className="fixed bottom-5 right-5 bg-white rounded-lg w-[24rem] h-[32rem] shadow-lg border border-gray-200 overflow-hidden ">
      <div className="flex p-2 bg-sky-500  text-gray-50 space-x-4 justify-between">
        <div className="flex flex-row gap-2">
        <div className="relative">
          <img
            className="w-12 h-12 rounded-full"
            src="/src/assets/bot.jpeg"
            alt=""
          />
           <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
        </div>
        
          <div className="py-2 font-bold">RS BOT</div>
          </div>
          <div onClick={handleshowchat} className="icon py-2 cursor-pointer">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
