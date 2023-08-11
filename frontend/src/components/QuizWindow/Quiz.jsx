import React, { useEffect, useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import WebCam from 'react-webcam';

function Timer({ initialTime, onTimeout }) {
  const [seconds, setSeconds] = useState(initialTime);
  const webcamRef = useRef(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 1) {
          return prevSeconds - 1;
        } else {
          clearInterval(interval);
          onTimeout();
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [onTimeout]);

  return (
    <>
      <div className="flex flex-col justify-center items-center mb-4">
        <button
          onClick={() => {
            const imageSrc = webcamRef.current.getScreenshot();
          }}
          className="px-4 py-2 mb-4 bg-red-500 text-white rounded-md hover:bg-sky-600 transition-colors duration-300"
        >
          Recording
        </button>
        <WebCam
          audio={false}
          ref={webcamRef}
          width={300}
          screenshotFormat="image/jpeg"
          className="border rounded-md"
        />

      </div>
      <div className="p-4 border rounded-lg shadow-md">

        <p className="text-lg font-semibold mb-2">Time left: {seconds} seconds</p>
        <div className="h-2 w-full bg-gray-200 rounded-lg">
          <div
            className="h-2 bg-blue-500 rounded-lg"
            style={{ width: `${(seconds / initialTime) * 100}%` }}
          ></div>
        </div>
      </div>
    </>
  );
}

function Quiz() {
  const [done, setDone] = useState(false);
  // const [data, setData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const data = [
    {
      "question": "What is the output of the following code? print(4 > 3 and 3 < 5)",
      "options": ["true", "false", "Error", "None"],
      "answer": 0
    },
    {
      "question": "Which of the following is not a Python keyword?",
      "options": ["import", "for", "variable", "break"],
      "answer": 2
    },
    {
      "question": "Which of the following is used to define a function in Python?",
      "options": ["var", "function", "def", "return"],
      "answer": 2
    },
    {
      "question": "What is the output of the following code? print(2 + '2')",
      "options": ["22", "4", "Error", "None"],
      "answer": 2
    },
    {
      "question": "What is the output of the following code snippet? nums = [2, 4, 6, 8] print(nums[::-1])",
      "options": ["[2, 4, 6, 8]", "[8, 6, 4, 2]", "[6, 8, 4, 2]", "[2, 6, 4, 8]"],
      "answer": 1
    }
  ]

  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     const jd_id = localStorage.getItem('jd_id')
  //     const response = await fetch('/api/hr/interview-question', {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  //         'X-User-ID': localStorage.getItem('user_id'),
  //         'content-type': 'application/json',
  //         'X-JD-ID': jd_id,
  //       },
  //     });

  //     if (response.status === 400) {
  //       console.log('Bad request');
  //     } else {
  //       const data = await response.json();
  //       console.log(data[0]);
  //       setData(data);
  //     }
  //   };
  //   fetchQuestions();
  // },[])

  const [markedOptions, setMarkedOptions] = useState(
    new Array(data.length).fill(null)
  );

  const goToNextQuestion = () => {
    if (currentQuestionIndex < data.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setCurrentQuestionIndex(0);
    }
    setShowNextQuestion(false);
  };

  const setQuestion = (id) => {
    setCurrentQuestionIndex(id - 1);
  };

  const handleOptionClick = (selectedOptionIndex) => {
    const updatedMarkedOptions = [...markedOptions];
    updatedMarkedOptions[currentQuestionIndex] = selectedOptionIndex;
    setMarkedOptions(updatedMarkedOptions);
    setShowNextQuestion(true);
    setTimeout(goToNextQuestion, 500); // Delayed transition to next question
  };

  const currentQuestion = data[currentQuestionIndex];


  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentQuestionIndex < data.length - 1) {
        goToNextQuestion();
      } else {
        submitTest();
      }
    }, 30000); // 30 seconds

    return () => clearTimeout(timeout);
  }, [currentQuestionIndex, data.length]);

  useEffect(() => {
    let currentTotal = 0;
    for (let i = 0; i < data.length; i++) {
      if (markedOptions[i] === data[i].answer) {
        currentTotal++;
      }
    }
    setTotal(currentTotal);
  }, [markedOptions, currentQuestionIndex, data]);


  const submitTest = async () => {
    const requestBody = {
      jd_id: localStorage.getItem('jd_id'),
      user_id: localStorage.getItem('user_id'),
      test_score: total
    };
    try {
      const response = await fetch('/api/user/submit', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'X-User-ID': localStorage.getItem('user_id'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody) // Convert the object to JSON
      });

      if (response.status === 400) {
        console.log('Bad request');
      } else {
        const data = await response.json();

        setDone(true)
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };



  if (currentQuestionIndex !== data.length) {
    return (
      <div className="bg-gray-900 h-screen flex items-center justify-center text-white py-16">

        <div className="bg-gray-900  flex flex-col items-start justify-center text-white py-16 w-[48rem]  -ml-64">

          <div className="mb-8 text-3xl font-semibold">
            {currentQuestionIndex + 1}. {currentQuestion.question}
          </div>
          <div className="grid grid-cols-2 gap-16">
            {currentQuestion.options.map((item, index) => (
              <div
                key={index}
                className={`px-32 py-4 bg-gray-700 rounded-md cursor-pointer ${index === markedOptions[currentQuestionIndex]
                  ? index === currentQuestion.answer
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                  : "hover:bg-sky-600 transition-colors duration-300"
                  }`}
                onClick={() => handleOptionClick(index)}
              >
                {item}
              </div>
            ))}
          </div>


          <div className="flex mt-8  ">
            {currentQuestionIndex >= data.length - 1 ?
              <button
                className="px-4 py-2 outline outline-sky-500 text-white rounded-md hover:bg-sky-500 transition-colors duration-300"
                onClick={submitTest}
              >
                Submit
              </button>
              :
              <button
                className="px-4 py-2 outline outline-sky-500 text-white rounded-md hover:bg-sky-500 transition-colors duration-300"
                onClick={goToNextQuestion}
                disabled={currentQuestionIndex === data.length - 1}
              >
                Next
              </button>
            }
          </div>
        </div>
        <div className="bg-gray-700 p-4  fixed pt-48 right-0 h-screen">
          <Timer
            key={currentQuestionIndex} // This key ensures the timer component is re-rendered when the question changes
            initialTime={30}
            onTimeout={goToNextQuestion}
          />
          <div className="flex flex-col justify-center items-center ">

            <div className="font-bold text-green-300 mt-20">Questions</div>
            <div className="grid grid-cols-5 gap-4">
              {data.map((item, index) => (
                <button
                  key={item.id}
                  // onClick={() => setQuestion(item.id)}
                  className={`h-12 w-12  ${item.id === currentQuestionIndex + 1 ? "bg-sky-500 p-2 rounded-lg" : ""
                    }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (currentQuestionIndex === data.length) {
    return (
      <div className="flex items-center justify-center bg-gray-900 h-screen text-white flex-col">
        {
          done === true ? <div className="flex items-center justify-center bg-gray-900 h-screen text-white flex-col">
            <div className=" text-6xl text-center">
              Test Submitted Successfully
            </div>
            <Link className="text-xl items-center justify-center my-4 outline w-fit outline-sky-500 px-4 hover:bg-sky-600 duration-300 text-white rounded-md p-2" to="/home">
              Home
            </Link>
          </div> : <div>
            <div className=" text-4xl text-center">
              Your Response has been recorded. Submit Test!
            </div>
            <button
              className="px-4 py-2 my-4 outline outline-sky-500 text-white rounded-md hover:bg-sky-500 transition-colors duration-300"
              onClick={submitTest}
            >
              Submit
            </button>
          </div>
        }
      </div>
    );
  }
}


export default Quiz;
