import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const listArray = [
  { label: "first-box", value: "" },
  { label: "second-box", value: "" },
  { label: "third-box", value: "" },
  { label: "fourth-box", value: "" },
];

function App() {
  const [otpList, setOtpList] = useState(listArray);
  const otpElem = useRef([]);

  function onKeyDownHandler(e, index) {
    const value = e.key;
console.log(value)
    if (value === "Backspace") {
      const newOtpList = otpList.map((elem, i) => {
        if (index === i) {
          return { ...elem, value: "" };
        }
        return elem;
      });
      setOtpList(newOtpList);
      otpElem.current[index - 1]?.focus();
    } 
    else if(e.key === 'ArrowLeft')
    {
      otpElem.current[index-1]?.focus()
    }
    else if(e.key === 'ArrowRight')
    {
      otpElem.current[index+1]?.focus()
    }
    else {
      if (isNaN(value)) {
        return;
      }

      const newOtpList = otpList.map((elem, i) => {
        if (i === index) {
          return { ...elem, value: e.key };
        }
        return elem;
      });
      otpElem.current[index + 1]?.focus();
      setOtpList(newOtpList);
    }
  }
  useEffect(() => {
    otpElem.current[0].focus();
  }, []);
  return (
    <div className="main-container">
      {otpList.map((elem, index) => (
        <div key={index}>
          <input
            ref={(e) => {
              otpElem.current[index] = e;
            }}
           
            className="input-container"
            type="text"
            value={elem?.value}
            style={{
              width: "40px",
              height: "40px",
              textAlign: "center",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              margin: "0 5px",
            }}
            onChange={()=>{
              
            }}
            onKeyDown={(e) => {
              onKeyDownHandler(e, index);
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
