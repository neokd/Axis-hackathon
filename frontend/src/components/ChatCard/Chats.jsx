import React from "react";

const FromBot = ({ msg }) => {
  return (
    <div className="w-full">
      <div className="w-11/12 p-2 float-left">
        <div className="text-gray-700 text-[12px]">bot</div>
        <div className="bg-gray-200 rounded-xl rounded-bl-sm p-2 my-1 ">
          {msg}
        </div>
      </div>
    </div>
  );
};
const Reply = ({ msg }) => {
  return (
    <div className="w-full">
      <div className="w-11/12 p-2 float-right">
        <div className="text-gray-700 text-[12px]">user</div>
        <div className="bg-sky-600 rounded-xl rounded-br-sm p-2 my-1 text-white ">
          {msg}
        </div>
      </div>
    </div>
  );
};

const Chats = () => {
  return (
    <div>
      <div className="w-full">
        <FromBot msg={"hello world how can I help you ? "} />
        <FromBot
          msg={"Before getting started please provide us your Name ? "}
        />
        <Reply msg={"Ashutosh "} />
        <FromBot msg={"Your mail id ? "} />
        <Reply msg={"user@gmail.com"} />
        <FromBot msg={"Your mail id ? "} />
        <Reply msg={"ashutoshnautiyal94@gmail.com"} />
      </div>
    </div>
  );
};

export default Chats;
