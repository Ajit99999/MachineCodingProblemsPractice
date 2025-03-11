import React, { useState } from "react";
import "./App.css";
import InfiniteScroll from "./InfiniteScroll";
const threshold = 40;
function App() {
  const [list, setList] = useState(new Array(40).fill(""));
  function loadMore() {
    setList((prev) => [...prev, new Array(10).fill("")]);
  }
  function onScrollHandler(e) {
    const { clientHeight, scrollTop, scrollHeight } = e.target;
    const remainingHeight = scrollHeight - (scrollTop + clientHeight);

    if (remainingHeight < threshold) {
      loadMore();
    }
  }
  return (
    <>
      {/* <div
        onScroll={onScrollHandler}
        style={{
          height: "500px",
          width: "400px",
          border: "2px solid black",
          overflowX: "auto",
        }}
      >
        {list &&
          list.map((_, index) => {
            return (
              <React.Fragment key={index}>
                <p
                  style={{
                    height: "auto",
                    marginTop: "-2px",
                    marginBottom: "-2px",
                    backgroundColor: `${index % 2 === 0 ? "gray" : "white"}`,
                  }}
                >
                  {index + 1}
                </p>
              </React.Fragment>
            );
          })}
      </div> */}
      {/* with intersection observer  */}
      <InfiniteScroll/>
    </>
  );
}

export default App;
