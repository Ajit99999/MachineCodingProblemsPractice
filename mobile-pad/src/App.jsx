import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(new Array(9).fill(false));
  const [res, setRes] = useState([]);
  let timer = useRef(null);
  useEffect(() => {
    if (data.every((elem) => elem)) {
      timer.current = setInterval(() => {
        const output = res.shift();
        setData((prev) => {
          const newData = prev.map((elem, index) => {
            if (index === output) {
              return false;
            }
            return elem;
          });
          return newData;
        });
        setRes([...res]);
      }, 1000);
    } else if (res.length === 0) {
      if (timer.current) {
        clearInterval(timer.current);
      }
    }
  }, [res]);

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          width: "300px",
        }}
      >
        {data.map((elem, index) => {
          return (
            <div
              onClick={() => {
                const newData = data.map((elem, i) => {
                  if (index === i) {
                    return !elem;
                  } else {
                    return elem;
                  }
                });
                const newRes = [...new Set([...(res || []), index])];
                const newRes1 = newRes.filter((elem) => {
                  if (elem === index && newData[index]) {
                    return true;
                  } else if (elem === index && !newData[index]) {
                    return false;
                  } else {
                    return true;
                  }
                });
                setData(newData);
                setRes(newRes1);
              }}
              key={index}
              style={{
                width: "80px",
                height: "80px",
                border: "1px solid black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                color: `${!elem ? "black" : "white"}`,
                backgroundColor: `${elem ? "black" : "white"}`,
              }}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
