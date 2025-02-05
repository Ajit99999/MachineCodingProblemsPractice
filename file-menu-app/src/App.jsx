import { useEffect, useState } from "react";

import "./App.css";
import Display from "./Display";

export const explorer = {
  id: "1",
  name: "root",
  isFolder: true,
  items: [
    {
      id: "2",
      name: "public",
      isFolder: true,
      items: [
        {
          id: "3",
          name: "public nested 1",
          isFolder: true,
          items: [
            {
              id: "4",
              name: "index.html",
              isFolder: false,
              items: [],
            },
            {
              id: "5",
              name: "hello.html",
              isFolder: false,
              items: [],
            },
          ],
        },
        {
          id: "6",
          name: "public_nested_file",
          isFolder: false,
          items: [],
        },
      ],
    },
    {
      id: "7",
      name: "src",
      isFolder: true,
      items: [
        {
          id: "8",
          name: "App.js",
          isFolder: false,
          items: [],
        },
        {
          id: "9",
          name: "Index.js",
          isFolder: false,
          items: [],
        },
        {
          id: "10",
          name: "styles.css",
          isFolder: false,
          items: [],
        },
      ],
    },
    {
      id: "11",
      name: "package.json",
      isFolder: false,
      items: [],
    },
  ],
};

function App() {
  const [fileData, setFileData] = useState(explorer);

  const [nodeObjectList, setNodeObjectList] = useState({});

  // function onDeleteHandler(id) {
  //   function deleteNode(parent, id) {
  //     if (parent.id === id) {
  //       return false;
  //     } else {
  //       const updatedItems = parent.items
  //         .map((elem) => {
  //           return deleteNode(elem, id);
  //         })
  //         .filter((elem) => elem);

  //       return {
  //         ...parent,
  //         items: updatedItems,
  //       };
  //     }
  //   }
  //   const updatedFileData = deleteNode(fileData, id);
  //   setFileData(updatedFileData);
  // }
  function onDeleteHandler(id) {
    function deleteNode(fileData) {
      const newFilteredData = fileData?.items.filter((elem) => elem.id !== id);
      const newFilteredData2 = newFilteredData?.map((elem) => {
        return deleteNode(elem);
      });

      return {
        ...fileData,
        items: newFilteredData2,
      };
    }

    const newUpdatedData = deleteNode(fileData);
    setFileData(newUpdatedData);
  }

  function onAddHandler(id, value, filetype) {
    if (!value) {
      return;
    }
    function addNode(fileData, id, value) {
      if (fileData.id === id) {
        const newItems = [
          ...fileData.items,
          {
            id: Date.now(),
            name: value,
            isFolder: filetype === true,
            items: [],
          },
        ];
        return {
          ...fileData,
          items: newItems,
        };
      } else {
        const newUpdatedItems = fileData.items.map((elem) => {
          return addNode(elem, id, value);
        });

        return {
          ...fileData,
          items: newUpdatedItems,
        };
      }
    }
    const newUpdatedData = addNode(fileData, id, value);
    setFileData(newUpdatedData);
  }

  function onCheckHandler(value, id) {
    function findNode(parent, value, id) {
      if (parent.id === id) {
        return {
          ...parent,
          isChecked: value,
          items: parent.items.map((elem) => findNode(elem, value, elem.id)),
        };
      } else {
        const newItems = parent.items.map((elem) => findNode(elem, value, id));
        return {
          ...parent,
          items: newItems,
        };
      }
    }

    const newUpdatedData = findNode(fileData, value, id);
    setFileData(newUpdatedData);
  }

  useEffect(() => {
    function appendData(data, parentId) {
      if (data.id) {
        setNodeObjectList((prev) => {
          return {
            ...prev,
            [data.id]: {
              id: data.id,
              parent: parentId,
              checked: false,
            },
          };
        });
      }
      data.items.map((elem) => appendData(elem, data.id));
    }
    appendData(explorer, null);
  }, []);


  return (
    <>
      <Display
        onCheckHandler={onCheckHandler}
        data={fileData}
        onAddHandler={onAddHandler}
        onDeleteHandler={onDeleteHandler}
      />
    </>
  );
}

export default App;
