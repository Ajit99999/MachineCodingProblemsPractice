import { useEffect, useState } from "react";

import "./App.css";
import Display from "./Display";

export const explorer = {
  id: "1",
  name: "root",
  done: false,
  items: [
    {
      id: "2",
      name: "public",
      done: false,
      items: [
        {
          id: "3",
          name: "public nested 1",
          done: false,
          items: [
            {
              id: "4",
              name: "index.html",
              done: false,
              items: [],
            },
            {
              id: "5",
              name: "hello.html",
              done: false,
              items: [],
            },
          ],
        },
        {
          id: "6",
          name: "public_nested_file",
          done: false,
          items: [],
        },
      ],
    },
    {
      id: "7",
      name: "src",
      done: false,
      items: [
        {
          id: "8",
          name: "App.js",
          done: false,
          items: [],
        },
        {
          id: "9",
          name: "Index.js",
          done: false,
          items: [],
        },
        {
          id: "10",
          name: "styles.css",
          done: false,
          items: [],
        },
      ],
    },
    {
      id: "11",
      name: "package.json",
      done: false,
      items: [],
    },
  ],
};

function App() {
  const [fileData, setFileData] = useState(explorer);

  function onChange(checked, id) {
    function updatedFileData(fileData, id, checked) {
      if (fileData.id === id) {
        return {
          ...fileData,
          done: checked,
          items: fileData.items.map((elem) =>
            updatedFileData(elem, elem.id, checked)
          ),
        };
      } else {
        const newItems = fileData.items.map((child) =>
          updatedFileData(child, id, checked)
        );

        // // Check if all children are unchecked (false)
        // const allChildrenUnchecked =
        //   newItems.length > 0 && newItems.every((child) => !child.done);

        // // Check if all children are checked (true)
        // const allChildrenChecked =
        //   newItems.length > 0 && newItems.every((child) => child.done);

        // return {
        //   ...fileData,
        //   items: newItems,
        //   done: allChildrenChecked
        //     ? true
        //     : allChildrenUnchecked
        //     ? false
        //     : fileData.done,
        // };

        const allChildrenUnchecked =
          newItems.length > 0 && newItems.every((child) => !child.done);

        return {
          ...fileData,
          items: newItems,
          done: allChildrenUnchecked ? false : fileData.done,
        };
      }
    }

    const newFileData = updatedFileData(fileData, id, checked);
    setFileData(newFileData);
  }
  return (
    <>
      <Display data={fileData} onChangeHandler={onChange} />
    </>
  );
}

export default App;
