import { useEffect, useRef } from "react";
import "./timer.css";
function Timer() {
  const timer = useRef();
  const count = 60;

  useEffect(() => startTimer(count), []);
  

  function startTimer(n) {
    const result = timer.current.querySelector(".result");
    let i = n - 1;

    const timerInterval = setInterval(function () {
      result.innerHTML = i--;

      const stopTimer = () => clearInterval(timerInterval);
      if (i < 5) result.style.color = "#ED3E42";
      if (i < 0) return stopTimer();

      function updateProgress() {
        var canvas = timer.current.querySelector(".progress");
        var context = canvas.getContext("2d");
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        var radius = 80;
        var circ = Math.PI * 2;
        var percent = i / n;
        context.beginPath();
        context.arc(centerX, centerY, radius, circ * percent, circ, false);
        context.lineWidth = 10;
        context.strokeStyle = "#880c0c";
        context.stroke();
      }

      updateProgress();
    }, 1000);
  }

  

  return (
    <div ref={timer} className="timer">
      <p className="result">{count}</p>
      <p className="sec">saniye</p>
      <canvas className="progress" width={200} height={200} />
    </div>
  );
}

export default Timer;
