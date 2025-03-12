import { useState } from "react";

const VirtualList = ({
  height = 300,
  width = 300,
  data,
  sizePerElement = 30,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(Math.floor(height / sizePerElement));
  function onScrollHandler(e) {
    const elem = Math.floor(e.target.scrollTop / sizePerElement);
    setStartIndex(elem);
    setEndIndex(Math.floor(height / sizePerElement) + elem);
  }

  const sliceData = data.slice(startIndex, endIndex + 1);
  console.log(sliceData, "data length", startIndex, "start", endIndex);
  return (
    <div
      onScroll={onScrollHandler}
      style={{
        height: `${height}px`,
        width: `${width}px`,
        border: "2px solid black",
        overflow: "auto",
      }}
    >
      <div
        style={{
          width: "100%",
          height: `${sizePerElement * data.length}px`,
          position: "relative",
        }}
      >
        {sliceData &&
          sliceData.map((elem, index) => {
            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: `${sizePerElement}px`,
                  backgroundColor: `${index % 2 === 0 ? "gray" : "white"}`,
                  top: `${sizePerElement * (startIndex + index)}px`,
                }}
              >
                {elem}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default VirtualList;
