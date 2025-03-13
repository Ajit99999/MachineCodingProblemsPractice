import { useState } from "react";
import "./App.css";
import VirtualList from "./VirtualList";
function App() {
  const [data, setData] = useState(new Array(40).fill("").map((_, i) => i + 1));
  function loadMore() {
    const array = [...data].map((_, i, array) => array.length + 1 + i);
    setData([...data, ...array]);
  }
  return (
    <>
      <VirtualList loadMore={loadMore} data={data}></VirtualList>
    </>
  );
}

export default App;
