import { useRef, useState } from "react";
import "./App.css";
import ToastItem from "./components/ToastItem";

function App() {
  const timer = useRef({});
  const [toasts, setToasts] = useState([]);

  function onClickHandler(type, label, position, show) {
    const id = Date.now();
    setToasts((prev) => [
      ...prev,
      {
        type,
        label,
        position,
        show,
        id,
      },
    ]);
    timer.current[id] = setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
      delete timer.current[id];
    }, 5000);
  }

  function onCloseHandler(id) {
    clearTimeout(timer.current[id]);
    delete timer.current[id];
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }

  function getToastsByPosition(toasts, position) {
    return toasts.filter((toast) => toast.position === position);
  }

  const positions = ["top-right", "top-left", "bottom-right", "bottom-left"];

  return (
    <>
      {positions.map((position) => {
        const positionToasts = getToastsByPosition(toasts, position);
        if (positionToasts.length === 0) return null;

        return (
          <div key={position} className={`toast-wrapper ${position}`}>
            {positionToasts.map((toast) => (
              <ToastItem key={toast.id} {...toast} onClick={onCloseHandler} />
            ))}
          </div>
        );
      })}
      <div style={{ marginTop: "100px" }}>
        <button
          onClick={() =>
            onClickHandler("success", "Success message", "top-right", true)
          }
        >
          Success
        </button>
        <button
          onClick={() =>
            onClickHandler("warning", "Warning message", "top-left", true)
          }
        >
          Warning
        </button>
        <button
          onClick={() =>
            onClickHandler("danger", "Danger message", "bottom-right", true)
          }
        >
          Danger
        </button>
        <button
          onClick={() =>
            onClickHandler("info", "Info message", "bottom-left", true)
          }
        >
          Info
        </button>
      </div>
    </>
  );
}

export default App;
