'use client';
import React, { useState, useEffect } from "react";
// import resetIcon from './assets/intervals.png';




const Timer = () => {
  const BREAK_TIME = 5 * 60;
  const ACTIVE_TIME = 25 * 60;
  const [timeLeft, setTimeLeft] = useState(ACTIVE_TIME); // default 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const BG_COLOUR = isBreak ? "bg-blue-400" : "bg-red-500"

  useEffect(() => {
    let timer;
    let breakPoint;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 10);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      setIsRunning(false);

    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };
  
  const switchTimer = (time) => {
      if (time === 'break') {
        setTimeLeft(BREAK_TIME)
        setIsBreak(true);
      } else if (time === 'active') {
        setTimeLeft(ACTIVE_TIME)
        setIsBreak(false);
      }
  }
  
  
  return (
    <>
      <div className={`${BG_COLOUR} flex justify-center items-center mx-10 lg:mx-64 rounded-xl`}>
        <div className="gap-5 lg:gap-20 mx-10 md:mx-64 p-40 bg-opacity-15 flex flex-col lg:flex-row justify-around items-center">
          <div className="flex flex-row lg:flex-col gap-5 mb-10">
            <button onClick={() => {
                switchTimer('active');
              }}
              className="border-red-500 border-2 p-2 rounded-xl underline-offset-8 underline text-black shadow-2xl">
                Work
            </button>
            <button onClick={() => {
                switchTimer('break');
              }}
              className=" border-blue-400 border-2 p-2 rounded-xl underline-offset-8 underline text-black shadow-2xl">
                Break
            </button>
          </div>
          <div className="flex justify-center flex-col w-full sm:w-64">
            <h3 className="flex justify-center text-8xl sm:text-8xl border-2 border-white rounded-xl p-2">{formatTime(timeLeft)}</h3>
            <button onClick={() => setIsRunning(!isRunning)}
            className={`${isRunning ? 'text-black':'text-white'} p-1 mt-5 text-3xl border-black border-2 rounded-xl`}>
              {isRunning ? 
                "Pause" 
              : 
                "Play"
              }
            </button>
          </div>
          <div className='mt-5'>
          <button
            onClick={() => {
              setIsRunning(false);
              isBreak ? switchTimer('break') : switchTimer('active');
            }}
            className="bg-gray-400 rounded-full p-2 flex items-center justify-center"
          >
            {/* <img className="w-40" src={resetIcon} alt="Reset Icon" /> */}
            Reset
          </button>


          </div>
        </div>
      </div>
    </>
  );
};

export default Timer;



//NOTES:
/*
- add customizable time selections so users can select how long they want to work or break for
- allow users to save their time selections through a mongodb instance but also for users without accounts to be able to use it, just wont save
*/