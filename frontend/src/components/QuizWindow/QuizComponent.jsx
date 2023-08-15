import React from "react";
import { useEffect, useMemo, useState, useRef } from "react";
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
    <div className="p-4  rounded-lg shadow-md">
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
      <div className="">
        <p className="text-lg font-semibold mb-2">Time left: {seconds} seconds</p>
        <div className="h-2 w-full bg-neutral-200 rounded-lg">
          <div
            className="h-2 bg-sky-500 rounded-lg"
            style={{ width: `${(seconds / initialTime) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

function Quiz() {
  const data = [
    {
      id: 1,
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      answer: 1,
    },
    {
      id: 2,
      question: "What is the largest mammal?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      answer: 1,
    },
    {
      id: 3,
      question: "Which gas do plants use for photosynthesis?",
      options: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"],
      answer: 1,
    },
    {
      id: 4,
      question: "What is the capital city of Japan?",
      options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
      answer: 2,
    },
    {
      id: 5,
      question: "Who painted the Mona Lisa?",
      options: [
        "Pablo Picasso",
        "Leonardo da Vinci",
        "Vincent van Gogh",
        "Michelangelo",
      ],
      answer: 1,
    },
  ];

  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  //   useEffect(() => {
  //     const handleBeforeUnload = (event) => {
  //       event.preventDefault();
  //       event.returnValue = "Leaving this page may result in losing progress.";
  //     };

  //     const handleVisibilityChange = () => {
  //       if (document.visibilityState === "hidden") {
  //         document.removeEventListener(
  //           "visibilitychange",
  //           handleVisibilityChange
  //         );
  //         window.removeEventListener("beforeunload", handleBeforeUnload);
  //       } else {
  //         document.addEventListener("visibilitychange", handleVisibilityChange);
  //         window.addEventListener("beforeunload", handleBeforeUnload);
  //       }
  //     };

  //     handleVisibilityChange(); // Initial setup

  //     return () => {
  //       document.removeEventListener("visibilitychange", handleVisibilityChange);
  //       window.removeEventListener("beforeunload", handleBeforeUnload);
  //     };
  //   }, []);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const [showNextQuestion, setShowNextQuestion] = useState(false);

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

  console.log(markedOptions);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentQuestionIndex < data.length - 1) {
        goToNextQuestion();
      }
    }, 30000); // 30 seconds

    return () => clearTimeout(timeout);
  }, [currentQuestionIndex, data.length]);

  useEffect(() => {
    // Calculate total marks

    let currentTotal = 0;
    for (let i = 0; i < data.length; i++) {
      if (markedOptions[i] === data[i].answer) {
        currentTotal++;
      }
    }
    setTotal(currentTotal);
  }, [markedOptions, currentQuestionIndex, data]);
  toggleFullscreen();

  console.log("the total marks are ", total);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Leaving this page may result in losing progress.";
    };

    const handleTabKey = (event) => {
      if (event.key === "Tab" || (event.altKey && event.key === "Tab")) {
        event.preventDefault();
        // Show your custom prompt or alert here
        alert("Please do not switch tabs!");
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        // Show your custom prompt or alert here
        alert("Please complete the quiz before exiting.");
      }
    };

    const handleF11Key = (event) => {
      if (event.key === "F11") {
        event.preventDefault(); // Prevent the browser's default behavior
        // Show your custom prompt or alert here
        alert("Please stay in fullscreen mode until the quiz is completed.");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("keydown", handleTabKey);
    window.addEventListener("keydown", handleEscapeKey);
    window.addEventListener("keydown", handleF11Key);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleTabKey);
      window.removeEventListener("keydown", handleEscapeKey);
      window.removeEventListener("keydown", handleF11Key);
    };
  }, []);

  if (currentQuestionIndex !== data.length) {
    return (
      <div className="bg-neutral-900 h-screen flex items-center justify-center text-white py-16 cursor-pointer">
        <div className="bg-neutral-900  flex flex-col items-start justify-center text-white py-16 w-[48rem]  -ml-64">
          <div className="mb-8 text-3xl font-semibold select-none">
            {currentQuestionIndex + 1}. {currentQuestion.question}
          </div>

          <div className="grid grid-cols-2 gap-16">
            {currentQuestion.options.map((item, index) => (
              <div
                key={index}
                className={`px-32 py-4 bg-neutral-700 rounded-md cursor-pointer ${index === markedOptions[currentQuestionIndex]
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
            <button
              className="px-4 py-2 outline outline-sky-500 text-white rounded-md hover:bg-sky-500 transition-colors duration-300"
              onClick={goToNextQuestion}
              disabled={currentQuestionIndex === data.length - 1}
            >
              Next
            </button>
          </div>
        </div>
        <div className="bg-neutral-700 p-4  fixed pt-96 right-0 h-screen">
          <Timer
            key={currentQuestionIndex} // This key ensures the timer component is re-rendered when the question changes
            initialTime={30}
            onTimeout={goToNextQuestion}
          />
          <div className="flex flex-col justify-center items-center ">
            <div className="font-bold text-green-300 mt-20">Questions</div>
            <div className="grid grid-cols-5 gap-4">
              {data.map((item) => (
                <button
                  key={item.id}
                  // onClick={() => setQuestion(item.id)}
                  className={`h-5 w-5 m-4 ${item.id === currentQuestionIndex + 1 ? "bg-sky-500" : ""
                    }`}
                >
                  {item.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {exitFullscreen()}
        <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
          <div className="p-8 rounded-lg shadow-md max-w-md">
            <h1 className="text-4xl font-semibold mb-4 text-sky-300">
              Test Submission
            </h1>
            <p className="mb-4 font-semibold text-lg">
              Your test has been submitted successfully. The results will be
              emailed to you soon.
            </p>
            <p>
              Thank you for completing the test. We appreciate your
              participation!
            </p>
          </div>
          <div className="mt-8">
            <Link to="/home">
              <button className="font-semibold px-6 py-3 rounded-lg bg-sky-500 hover:bg-sky-600 transition duration-300">
                Go Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Quiz;
