import { useEffect, useState } from "react";
import Navbar from "../hr/Navbar";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Notifications from "./Notifications";

function ViewJD() {
  const [data, setData] = useState([]);
  const [filteredJobData, setFilteredJobData] = useState(data);
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const user_id = localStorage.getItem("user_id");

    if (!token || user_id === null) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchJD = async () => {
    const user_id = localStorage.getItem("user_id");

    const response = await fetch("/api/viewjd", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "X-User-ID": user_id,
      },
    });
    const data = await response.json();
    setData(data);
  };
  useEffect(() => {
    fetchJD();
  }, []);

  useEffect(() => {
    setFilteredJobData(data); // Set the initial filtered data to jobData
  }, [data]);

  const handleApply = async (jd_id) => {
    const user_id = localStorage.getItem("user_id");
    const response = await fetch("/api/applyjd", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "X-User-ID": user_id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jd_id: jd_id,
      }),
    });
    const data2 = await response.json();
    //  Filter applied job
    if (data2) {
      const filteredData = data.filter((item) => item.jd_id === jd_id);
      setMessage(`Applied for ${filteredData[0].title} successfully`);
      setType("success");
    }
  };

  console.log("the jds are", data);

  const handleFilter = (filteredData) => {
    setFilteredJobData(filteredData);
  };

  console.log("the filtered data initially is ", filteredJobData);

  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar
          jds={data}
          filteredJds={filteredJobData}
          onFilter={handleFilter}
        />
        <div className="text-xl bg-white/90 dark:bg-neutral-900 duration-300 min-h-screen  font-semibold p-4">
          <h1 className="text-3xl dark:text-white mx-8 mt-4 font-semibold">
            Jobs
          </h1>
          <Notifications message={message} type={type} />
          <div className="grid grid-cols-1 gap-4 px-8 mt-12 w-3/4">
            {filteredJobData.map((item) => (
              <div
                key={item.jd_id}
                className={`bg-white dark:text-white dark:bg-neutral-800 p-4 mrounded-lg shadow flex flex-row justify-between rounded-xl  ${hoveredCard === item.jd_id
                    ? "shadow-lg shadow-sky-500 duration-500"
                    : ""
                  }`}
                onMouseEnter={() => setHoveredCard(item.jd_id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div>
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="mt-2 line-clamp-2 dark:text-gray-200">{item.description}</p>
                  <div
                    className={`relative m  bg-white/90 duration-500 delay-200 dark:bg-neutral-800 flex flex-col    ${hoveredCard === item.jd_id ? "opacity-100" : "opacity-50"
                      }`}
                  >
                    <h1 className="mb-2 font-semibold">
                      Salary: {item.salary}
                    </h1>
                    <div className="mb-2 font-semibold">
                      Skills:{item?.skills?.join(", ")}
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => handleApply(item.jd_id)}
                    className="mt-4 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 duration-300"
                  >
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// {data.map((item) => (
//     <div key={item.jd_id} className="bg-white text-white dark:bg-gray-800 p-4 my-4 rounded-lg shadow flex flex-row justify-between items-stretch ">
//         <div>
//             <h2 className="text-xl font-semibold">{item.title}</h2>
//             <p className="mt-2">{item.description}</p>
//         </div>
//         <div>
//             <button onClick={() => handleApply(item.jd_id)} className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">Apply</button>
//         </div>
//     </div>
// ))}
export default ViewJD;
