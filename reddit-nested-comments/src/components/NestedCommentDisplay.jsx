import { useState } from "react";

const NestedCommentsDisplay = ({ data, onClickHandlerNestedComments }) => {
  const [commentInput, setCommentInput] = useState("");
  const [commentId, setCommentId] = useState(null);

  return (
    <div
      style={{
        marginLeft: "10px",
        textAlign: "left",
      }}
    >
      {data &&
        data.map((commentItem) => {
          return (
            <div key={commentItem.id}>
              <div> {commentItem.comment}</div>
              {commentItem.id === commentId && (
                <input
                  style={{
                    height: "30px",
                    width: "150px",
                    outline: "none",
                    border: "1px solid black",
                    borderRadius: "20px 20px",
                    margin: "5px 5px",
                  }}
                  value={commentInput}
                  onChange={(e) => {
                    setCommentInput(e.target.value);
                  }}
                />
              )}
              <button
                onClick={() => {
                  setCommentId(commentItem.id);
                  if (!commentInput) {
                    return;
                  }
                  onClickHandlerNestedComments(commentItem.id, commentInput);
                  setCommentInput("");
                  setCommentId(null);
                }}
              >
                Add
              </button>

              <NestedCommentsDisplay
                onClickHandlerNestedComments={onClickHandlerNestedComments}
                data={commentItem.children}
              />
            </div>
          );
        })}
    </div>
  );
};
export default NestedCommentsDisplay;
