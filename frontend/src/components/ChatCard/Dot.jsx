import React from "react";
import ChatCard from "./ChatCard";

const Dot = ({ handleshowchat }) => {
  return (
    <div
      onClick={handleshowchat}
      className="fixed bottom-10 right-10  text-white bg-sky-500 p-8 rounded-full  shadow-lg  overflow-hidden"
    ></div>
  );
};

export default Dot;
