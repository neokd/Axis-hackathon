import { useState } from "react";
import useTheme from "../../hooks/useTheme";
import Searchbar from "./Searchbar";
import { CgProfile } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";

function Navbar({ jds, filteredJds, onFilter }) {
  console.log("the jds inside the navbar are ", jds);

  const [inputdata, setInputdata] = useState();
  const [filteredData, setFilteredData] = useState(jds);

  const handleSearch = (inputValue) => {
    setInputdata(inputValue);

    const filteredData = jds.filter((jd) =>
      jd.title.toLowerCase().includes(inputValue.toLowerCase())
    );

    onFilter(filteredData);
  };

  const [nextTheme, setTheme] = useTheme();

  return (
    <nav>
      <div className="bg-zinc-100 dark:bg-neutral-950 h-16 px-4 z-10 ">
        <div className="lg:p-3 p-2  duration-100 mx-2 rounded-lg flex justify-between w-full">
          <div className="w-full flex flex-row relative">
            <FiSearch className="absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none w-11 h-11 p-3 dark:text-white/60 " />
            <input
              type="text"
              className="bg-slate-200 dark:bg-neutral-800 border border-slate-800 outline-1  dark:outline-slate-800  focus:outline-sky-600 dark:focus:outline-sky-600 p-2 w-1/2 rounded-xl dark:text-white pl-8"
              placeholder="Search..."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className=" p-2   duration-100 mx-2 rounded-lg  flex">
            <button
              onClick={nextTheme === "light" ? () => setTheme(nextTheme) : null}
              className={`${
                nextTheme === "dark"
                  ? "text-amber-500 animate-spin-slow"
                  : "text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 stroke-2 dark:stroke-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            </button>
            <div className="border border-r border-black dark:border-white mx-3 my-1" />
            <button
              onClick={nextTheme === "dark" ? () => setTheme(nextTheme) : null}
              className={`${
                nextTheme === "light" ? "text-yellow-200 animate-move-up" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-2 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            </button>
            <button>
              <CgProfile className="text-3xl ml-6 text-gray-400 dark:text-gray-200" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
