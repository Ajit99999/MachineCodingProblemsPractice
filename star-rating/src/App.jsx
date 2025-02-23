import { useState } from "react";
import "./App.css";
export const starArray = new Array(5).fill("");

function App() {
  const [currentIndex, SetCurrentIndex] = useState();
  const [hoverIndex, SetHoverIndex] = useState();
  // let finalIndex;

  // if (hoverIndex !== undefined) {
  //   finalIndex = hoverIndex;
  // } else if (currentIndex !== undefined) {
  //   finalIndex = currentIndex;
  // }

  // we declared extra variable, incase we don't want any different color for hover & clicked 
  // As a result of we can just re-use this variable
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          gap: "10px",
        }}
      >
        {starArray &&
          starArray.map((_, index) => {
            return (
              <div key={index}>
                <p
                  style={{
                    fontSize: "50px",
                    cursor: "pointer",
                    color: `${
                      (hoverIndex === undefined &&
                        index <= currentIndex &&
                        "rgb(225, 191, 0)") ||
                      (index <= hoverIndex && "rgb(255, 231, 97)") ||
                      "black"
                    }`,
                  }}
                  onClick={() => {
                    SetCurrentIndex(index);
                  }}
                  onMouseEnter={() => {
                    SetHoverIndex(index);
                  }}
                  onMouseLeave={() => {
                    SetHoverIndex(undefined);
                  }}
                >
                  &#9734;
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;
