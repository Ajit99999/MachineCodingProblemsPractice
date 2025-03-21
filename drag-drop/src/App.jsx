import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      title: "Read a book",
    },
    {
      id: 2,
      title: "Buy a book",
    },
    {
      id: 3,
      title: "Sell a book",
    },
  ]);
  const [completedList, setCompletedList] = useState([]);

  const [dragStartElem, setDragStartElem] = useState(null);
  const [dragStartList, setDragStartList] = useState(false);

  console.log(dragStartElem, dragStartList);
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "100px",
        }}
      >
        <div
          style={{
            width: "250px",
            height: "250px",
            border: "2px solid black",
            borderRadius: "10px 10px",
            padding: "5px 5px",
            overflow: "auto",
            opacity: `${dragStartList ? "0.2" : "1"}`,
          }}
          onDrop={(e) => {
            e.preventDefault();
            const data = JSON.parse(e.dataTransfer.getData("text"));
            setTodoList([...todoList, data]);
            const updatedCompletedList = completedList.filter((elem) => {
              return elem.id !== data.id;
            });
            setCompletedList(updatedCompletedList);
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          <div>To to be done </div>
          {todoList &&
            todoList.map((elem) => {
              return (
                <div
                  draggable={true}
                  onDragStart={(e) => {
                    setDragStartElem(elem.id);
                    setDragStartList(true);
                    e.dataTransfer.setData("text", JSON.stringify(elem));
                  }}
                  onDragEnd={() => {
                    setDragStartElem(null);
                    setDragStartList(false);
                    console.log("called");
                  }}
                  onDrag={(e) => {}}
                  style={{
                    width: "auto",
                    height: "30px",
                    border: "1px solid black",
                    borderRadius: "10px 10px",
                    margin: "12px 5px",
                    textAlign: "center",
                    padding: "5px",
                    cursor: "pointer",
                    borderColor: `${
                      dragStartElem === elem.id ? "red" : "black"
                    }`,
                  }}
                  key={elem.id}
                >
                  {elem.title}
                </div>
              );
            })}
        </div>
        <div
          style={{
            width: "250px",
            height: "250px",
            border: "2px solid black",
            borderRadius: "10px 10px",
            padding: "5px 5px",
            overflow: "auto",
          }}
          onDrop={(e) => {
            e.preventDefault();
            const data = JSON.parse(e.dataTransfer.getData("text"));
            e.dataTransfer.clearData("text");
            setCompletedList([...completedList, data]);
            const updatedTodoList = todoList.filter((elem) => {
              return elem.id !== data.id;
            });
            setTodoList(updatedTodoList);
            setDragStartElem(null);
            setDragStartList(false);
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          <div>To to be completed </div>
          {completedList &&
            completedList.map((elem) => {
              return (
                <div
                  draggable={true}
                  onDragStart={(e) => {
                    e.dataTransfer.setData("text", JSON.stringify(elem));
                  }}
                  style={{
                    width: "auto",
                    height: "30px",
                    border: "1px solid black",
                    borderRadius: "10px 10px",
                    margin: "5px 5px",
                    textAlign: "center",
                    padding: "5px",
                  }}
                  key={elem.id}
                >
                  {elem.title}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
