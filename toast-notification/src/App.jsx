import { useRef, useState } from "react";
import "./App.css";
import ToastItem from "./components/ToastItem";

function App() {
  const timer = useRef({});
  const [toasts, setToasts] = useState([]);
  function onClickHandler(type, label, position, show) {
    // timer.current = setTimeout(() => {
    //   console.log("called");
    //   setShow(false);
    // }, 1000);
    const id = Date.now();
    setToasts([
      ...toasts,
      {
        type,
        label,
        position,
        show,
        id,
      },
    ]);
    timer.current[id] = setTimeout(() => {
      console.log("callled");
      setToasts((prev) => {
        const updatedToasts = prev.filter((toast) => {
          return toast.id !== id;
        });
        return updatedToasts;
      });
      delete timer.current[id];
    }, 5000);
  }
  function onCloseHandler(id) {
    clearTimeout(timer.current[id]);
    delete timer.current[id];
    const updatedToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });
    setToasts(updatedToasts);
  }

  console.log(toasts, "toasts");
  console.log(timer.current, Object.keys(timer.current).length, "timer");
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        {toasts &&
          toasts.map((toast) => {
            return (
              <ToastItem
                onClick={onCloseHandler}
                key={toast.id}
                show={toast.show}
                {...toast}
              />
            );
          })}
      </div>
      {/* <ToastItem
        onClick={onCloseHandler}
        show={show}
        type={"info"}
        label={"Success"}
        position={"top-right"}
      /> */}

      <div>
        <button
          onClick={() => {
            onClickHandler("success", "Success message", "top-right", true);
          }}
        >
          {" "}
          Success{" "}
        </button>
      </div>
      <div>
        <button> Warning </button>
      </div>

      <div>
        <button> Danger </button>
      </div>
      <div>
        <button> Info </button>
      </div>
    </>
  );
}

export default App;
