import { useEffect, useRef, useState } from "react";
import "../../src/index.css";
const ProgressBar = ({ stepper = 5 }) => {
  const [width, setWidth] = useState(Math.max(0, 0));
  const timer = useRef(null);
  useEffect(() => {
    timer.current = setInterval(() => {
      setWidth((prev) => Math.min(prev + Math.floor(stepper), 100));
    }, 100);

    return () => {
      clearInterval(timer.current);
    };
  }, []);
  console.log(width, "width");
  return (
    <div
      style={{
        width: "400px",
        height: "30px",
        border: "1px solid black",
        borderRadius: "20px 20px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        className="inside-container"
        style={{
          height: `100%`,

          width: `${100}%`,
          transform: `translateX(${-100 + width}%)`,
          //  width: "auto",
          backgroundColor: "green",
          borderRadius: "20px 20px",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: width < 50 ? "black" : "white",
          //   fontWeight: "bold",
        }}
      >
        {width}
      </div>
    </div>
  );
};

export default ProgressBar;
