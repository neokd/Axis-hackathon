import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Notifications from "./Notification";

function PostJD() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const postJD = async (
    title,
    description,
    location,
    qualification,
    experience,
    skills,
    salary,
    date
  ) => {
    const hr_id = localStorage.getItem("hr_id");
    const skillsArray = skills.split(",");
    const response = await fetch("/api/post_jd", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "X-Hr-ID": hr_id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        location: location,
        qualification: qualification,
        experience: experience,
        skills: skillsArray,
        salary: salary,
        end_date: date,
      }),
    });
    if (response.ok) {
      console.log("Job Posted Successfully");
      setMessage("Job Posted Successfully");
    }
  };

  return (
    <div className="flex dark:bg-neutral-950 ">
      <div className="fixed left-0">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full md:ml-[17rem]">
        <Navbar />
        <div className=" text-xl bg-white/90 dark:bg-neutral-900 duration-300 min-h-screen  font-semibold p-4">
          <Notifications message={message} type={"success"} />
          <h1 className="text-3xl font-semibold dark:text-white/90 px-8 mt-6 ">
            Add Job Description
          </h1>
          <div className="mt-8 px-8">
            <div className="bg-zinc-100 shadow-lg   duration-300 dark:bg-neutral-800 rounded-xl p-4 flex flex-col justify-between">
              <div className="dark:text-white/90">
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">
                    Job Title
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="rounded-md p-2 border-2 dark:bg-neutral-800 dark:border-neutral-700 w-1/2"
                      required
                      placeholder="Job Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">
                    Job Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      type="text"
                      name="description"
                      id="description"
                      className="rounded-md p-2 border-2 dark:bg-neutral-800 dark:border-neutral-700 w-1/2"
                      required
                      placeholder="Job Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">
                    Location
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="description"
                      id="description"
                      className="rounded-md p-2 border-2 dark:bg-neutral-800 dark:border-neutral-700 w-1/2"
                      required
                      placeholder="Job Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">
                    Qualification
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="description"
                      id="description"
                      className="rounded-md p-2 border-2 dark:bg-neutral-800 dark:border-neutral-700 w-1/2"
                      required
                      placeholder="Qualification"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">
                    Experience
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="description"
                      id="description"
                      className="rounded-md p-2 border-2 dark:bg-neutral-800 dark:border-neutral-700 w-1/2"
                      required
                      placeholder="Experience"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">
                    Skill Set
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="description"
                      id="description"
                      className="rounded-md p-2 border-2 dark:bg-neutral-800 dark:border-neutral-700 w-1/2"
                      required
                      placeholder="Python,ReactJS..."
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">
                    Salary
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="description"
                      id="description"
                      className="rounded-md p-2 border-2 dark:bg-neutral-800 dark:border-neutral-700 w-1/2"
                      required
                      placeholder="1,00,000"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">
                    Date
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      name="description"
                      id="description"
                      className="rounded-md p-2 border-2 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 w-1/2"
                      required
                      placeholder="Job Description"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() =>
                      postJD(
                        title,
                        description,
                        location,
                        qualification,
                        experience,
                        skills,
                        salary,
                        endDate
                      )
                    }
                    className="outline outline-2 dark:text-white hover:text-neutral-200 outline-sky-600 hover:bg-sky-600 duration-300 shadow-lg hover:shadow-sky-500 py-2 px-4 rounded-md"
                  >
                    Post Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostJD;
