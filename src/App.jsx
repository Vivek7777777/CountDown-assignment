import { useState, useRef, useEffect } from 'react'
import Countdown from 'react-countdown'

function App() {
  const [count, setCount] = useState(0);
  const [play, setPlay] = useState(false);
  const [pause, setPause] = useState(false);
  const [resetTime, setResetTime] = useState(0);
  const countdownRef = useRef();

  let currentTime;

  //HANDLE INPUT
  function getTime(e) {
    let time = e.target.value * 60000;
    setCount(time);
    setResetTime(time);
  }

  //START 
  function startTimer() {
    if(play)
      return;
    setPlay(true);
    countdownRef.current.api.start();
  }

  //PLAY/PAUSE
  function pauseTimer() {
    if(!play){
      return;
    }
    setPause(prev => !prev)
    if (pause) {
      countdownRef.current.api.start();
    }
    else {
      setCount(currentTime);
      countdownRef.current.api.pause();
    }
  }

  //RESET TIME
  function resetTimer(){
    setPlay(false);
    setPause(false);   
    countdownRef.current.api.pause();
    setCount(resetTime);
  }

  //COUNTDOWN
  function renderer({ total, hours, minutes, seconds }) {
    currentTime = total;
    return (
      <div className='time'>
        {hours}:{minutes}:{seconds}
      </div>
    )
  }

  return (
    <>
      <div className='counter'>
        <label className='heading'>Enter minutes
        </label>
        <input type="number" onChange={getTime} />

        <div className='timer'>
          <Countdown
            ref={countdownRef}
            date={Date.now() + count}
            autoStart={pause} 
            renderer={renderer}
          />
        </div>

        <div className='timer'>
          <svg onClick={startTimer} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="btn">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
          <svg onClick={pauseTimer} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="btn">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811z" />
          </svg>
          <svg onClick={resetTimer} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="btn">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </div>
      </div>
    </>
  )
}

export default App
