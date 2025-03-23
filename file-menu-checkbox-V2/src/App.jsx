import { useEffect, useRef, useState } from "react";
import "./App.css";
import DisplayCheckbox from "./components/DisplayCheckbox";
const data = {
  id: 1,
  name: "root",
  checked: false,
  children: [
    {
      id: 2,
      name: "publicFolder2",
      checked: false,
      children: [
        {
          id: 4,
          name: "publicFolder4",
          checked: false,
          children: [
            {
              id: 5,
              name: "publicFolder5",
              checked: false,
              children: [],
            },
          ],
        },
        {
          id: 6,
          name: "publicFolder6",
          checked: false,
          children: [],
        },
      ],
    },
    {
      id: 3,
      name: "publicFolder3",
      checked: false,
      children: [],
    },
  ],
};

function App() {
  const [map, setMap] = useState(new Map());
  function onChangeHandler(e, id) {
    const newMap = new Map(map);
    function traverse(id) {
      const node = newMap.get(id);
      if (!node) {
        return;
      }
      const updatedNode = { ...node, checked: e.target.checked };
      newMap.set(node.id, updatedNode);
      node.children.forEach((elem) => {
        traverse(elem);
      });

      function updateParents(id) {
        const parentNode = newMap.get(id);
        if (!parentNode) {
          return;
        }
        const allChecked = parentNode.children.every(
          (childId) => newMap.get(childId).checked
        );
        const allUnChecked = parentNode.children.some(
          (childId) => newMap.get(childId).checked
        );

        newMap.set(id, {
          ...parentNode,
          checked: allChecked ? true : allUnChecked ? false : false,
        });
        updateParents(parentNode.parentId);
      }

      updateParents(node.parentId);
    }

    traverse(id);
    setMap(newMap);
  }
  useEffect(() => {
    const newMap = new Map();
    function traverse(data, parentId) {
      if (!newMap.has(data.id)) {
        newMap.set(data.id, {
          id: data.id,
          checked: data.checked,
          children: data.children.map((elem) => elem.id),
          parentId: parentId || null,
        });
      }
      data.children.forEach((elem) => {
        traverse(elem, data.id);
      });
    }
    traverse(data);
    setMap(newMap);
  }, []);
  console.log(map);
  return (
    <>
      <DisplayCheckbox
        map={map}
        onChangeHandler={onChangeHandler}
        fileData={data}
      />
    </>
  );
}

export default App;
