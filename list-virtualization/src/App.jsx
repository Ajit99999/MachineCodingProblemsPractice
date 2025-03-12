import { useState } from "react";
import './App.css'
import VirtualList from './VirtualList'
function App() {
  const [ data, setData] = useState(new Array(40).fill("").map((elem,i)=>i+1))
  return (
    <>
      <VirtualList
      data={data}
      
      ></VirtualList>
    </>
  )
}

export default App
