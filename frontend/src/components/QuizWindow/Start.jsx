import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className=" bg-gray-100 dark:bg-neutral-900 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md max-w-md">
        <h1 className="text-2xl font-bold mb-4">Test Instructions</h1>

        <div className="mb-6">
          <p className="text-gray-700 mb-2">
            1. Please be aware that this test session is being recorded. Any use
            of unfair means is strictly prohibited.
          </p>
          <p className="text-red-600 italic">
            Remember, honesty is the best policy.
          </p>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 mb-2">
            2. This test consists of 25 sections, each with 25 questions.
          </p>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 mb-2">
            3. You can proceed to the next question, but you won't be able to
            revisit previous questions once you've moved on.
          </p>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 mb-2">
            4. It's important to stay on this tab throughout the test. Switching
            tabs or window shall result in a deduction of marks.
          </p>
          <p className="text-red-600 italic">
            Stay focused and maintain your concentration.
          </p>
        </div>

        <Link
          to={"/interview-question/quiz"}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Start Test
        </Link>
      </div>
    </div>
  );
};

export default Start;
