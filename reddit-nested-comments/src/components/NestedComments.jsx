import { useState, useRef, useEffect } from "react";
import NestedCommentsDisplay from "./NestedCommentDisplay";
const NestedComments = () => {
  const [commentInput, setCommentInput] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  let count = useRef(0);
  const commentsMap = useRef(new Map());

  function onChangeHandler(e) {
    if (!e.target.value) {
      setCommentInput("");
      return;
    }
    setCommentInput(e.target.value);
  }

  function onClickHandler(e) {
    if (commentInput.length === 0) {
      return;
    }

    setCommentsList((prev) => {
      return [
        ...prev,
        {
          id: ++count.current,
          comment: commentInput,
          children: [],
        },
      ];
    });
    setCommentInput("");
  }
  function onClickHandlerNestedComments(id, value) {
    // function onAddData(data, id, value) {
    //   const newList = data.map((elem) => {
    //     if (elem.id === id) {
    //       return {
    //         ...elem,
    //         children: [
    //           ...elem.children,
    //           {
    //             id: ++count.current,
    //             comment: value,
    //             children: [],
    //           },
    //         ],
    //       };
    //     } else {
    //       const newUpdatedData = onAddData(elem?.children, id, value);
    //       return {
    //         ...elem,
    //         children: newUpdatedData,
    //       };
    //     }
    //   });
    //   return newList;
    // }
    // const newUpdatedList = onAddData(commentsList, id, value);
    // setCommentsList(newUpdatedList);

    // using hashmap, time complexity for look up O(1) & added operation O(1)
    function updateMap(id, value) {
      if (!commentsMap.current.has(id)) {
        return;
      }
      const parentNode = commentsMap.current.get(id);
      const newChildNode = {
        id: ++count.current,
        comment: value,
        children: [],
      };
      parentNode.children = [...parentNode.children, newChildNode];
      commentsMap.current.set(id, parentNode);
      setCommentsList([...commentsList]);
    }
    updateMap(id, value);
  }

  useEffect(() => {
    function getPopulate(data) {
      data.forEach((elem) => {
        commentsMap.current.set(elem.id, elem);
        getPopulate(elem.children);
      });
    }
    getPopulate(commentsList);
  }, [commentsList]);
  console.log(commentsList);
  console.log(commentsMap, "map");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        border: "1px solid black",
        borderRadius: "20px 20px",
        padding: "5px 5px",
      }}
    >
      <div>
        <input
          style={{
            height: "30px",
            width: "300px",
            outline: "none",
            border: "1px solid black",
            borderRadius: "20px 20px",
            margin: "5px 5px",
          }}
          type="text"
          value={commentInput}
          onChange={(e) => {
            onChangeHandler(e);
          }}
        ></input>

        <button
          onClick={() => {
            onClickHandler();
          }}
        >
          Add
        </button>
      </div>
      <NestedCommentsDisplay
        onClickHandlerNestedComments={onClickHandlerNestedComments}
        data={commentsList}
      />
    </div>
  );
};

export default NestedComments;
