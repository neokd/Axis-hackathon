import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import {TbListNumbers, TbUserX} from "react-icons/tb"
import {BsPostcard} from "react-icons/bs"
const Sidebar = () => {
  const menus = [
    { name: "Dashboard", link: "/home", icon: MdOutlineDashboard },
    { name: "Profile", link: "/profile", icon: AiOutlineUser },
    { name: "Apply Job", link: "/viewjd", icon: BsPostcard },
    { name: "Test", link: "/interview-question", icon: TbReportAnalytics},
    { name: "Result", link: "/hr/result", icon: TbListNumbers },
    { name: "Sign Out", link: "/login", icon: TbUserX },
  ];
  const [open, setOpen] = useState(true);
  return (
    <div className="">
      <div
        className={`bg-zinc-100 dark:bg-neutral-950 dark:text-white  h-full ${open ? "w-72" : "w-16"} duration-500 px-4`}>
        <div className="py-3 flex justify-end ">
          <HiMenuAlt3 size={26} className="cursor-pointer " onClick={() => setOpen(!open)} />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link to={menu?.link} key={i} className={` ${menu?.margin && "mt-5"} group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-sky-400 rounded-md`} >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2 style={{ transitionDelay: `${i + 3}00ms`, }} className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`} >
                {menu?.name}
              </h2>
              <h2
                className={`${open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}

              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
