import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

function Result() {
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async (jd_id) => {
      const response = await fetch(`/api/hr/result`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "X-JD-ID": jd_id,
          'content-type': 'application/json'
        },
      });
      const data = await response.json();
      console.log(data)
      setData(data);
    };
    fetchData(localStorage.getItem('jd_id'));
  }, []);

  return (
    <div className="flex dark:bg-neutral-950 ">
      <div className="fixed left-0">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full md:ml-[17rem]">
        <Navbar />
        <div className=" text-xl bg-white/90 dark:bg-neutral-900 duration-300 min-h-screen  font-semibold p-4">
          <h1 className="text-3xl mx-8 mt-8 font-bold text-gray-700 dark:text-neutral-100">Result</h1>
          <div className="flex flex-col mx-8 mt-12">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2  align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 dark:border-neutral-800 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-800">
                    <thead className="bg-gray-50 dark:bg-neutral-900 font-bold">
                      <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs  text-gray-500 dark:text-neutral-300 uppercase tracking-wider">SNO</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs text-gray-500 dark:text-neutral-300 uppercase tracking-wider">Candidate Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs text-gray-500 dark:text-neutral-300 uppercase tracking-wider">Candidate Email</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs text-gray-500 dark:text-neutral-300 uppercase tracking-wider">Candidate Score</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-neutral-950 dark:divide-neutral-800">
                      {
                        data.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-neutral-300">{index + 1}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-neutral-300">{item.username}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-neutral-300">{item.email}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-neutral-300">{item.test_score}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Result
