import { useState } from "react";

const VirtualList = ({
  height = 300,
  width = 300,
  data,
  sizePerElement = 30,
  loadMore,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(Math.floor(height / sizePerElement));
  function onScrollHandler(e) {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const elem = Math.floor(scrollTop / sizePerElement);
    setStartIndex(elem);
    setEndIndex(Math.floor(height / sizePerElement) + elem);

    // adding infinite scroll Effect as well
    const remainingHeight = scrollHeight - (scrollTop + clientHeight);
    if (remainingHeight < 20) {
      loadMore();
    }
  }

  const sliceData = data.slice(startIndex, endIndex + 1);
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
