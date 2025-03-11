import React, { useEffect, useRef, useState } from "react";
const threshold = 40;
function InfiniteScroll() {
  const [list, setList] = useState(new Array(25).fill(""));
  function loadMore() {
    setList((prev) => [...prev, new Array(10).fill("")]);
  }
  const listElem = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    const lastElem = listElem.current[listElem.current.length - 1];
    observer.observe(lastElem);
    return () => {
      observer.unobserve(lastElem);
      observer.disconnect();
    };
  }, [list.length]);

  return (
    <>
      <div
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
                  ref={(elem) => (listElem.current[index] = elem)}
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
      </div>
    </>
  );
}

export default InfiniteScroll;
