import React, { useState } from "react";

const Display = ({ data, onDeleteHandler, onAddHandler, onCheckHandler }) => {
  const [isShow, setisShow] = useState(true);
  const [newNodeId, setNewNodeId] = useState(null);
  const [nodeValue, setnodeValue] = useState("");
  const [filetype, setFiletype] = useState(true);

  return (
    data && (
      <div
        style={{
          marginLeft: "10px",
          textAlign: "left",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <input
            type="checkbox"
            id="check-box1"
            name="check-box"
            checked={data.isChecked || false}
            onChange={(e) => {
              onCheckHandler(e.target.checked, data.id);
            }}
          />

          <div
            onClick={() => {
              setisShow((prev) => !prev);
            }}
          >
            {data.name} {data.isFolder ? "🗂️" : "📄"}
          </div>

          <div>
            {data.isFolder && (
              <select
                style={{
                  margin: "5px 5px",
                }}
                value={filetype}
                onChange={(e) => {
                  setFiletype(e.target.value);
                }}
              >
                <option value={true}> folder</option>
                <option value={false}> file </option>
              </select>
            )}
            {data.isFolder && (
              <button
                onClick={() => {
                  setNewNodeId(data.id);
                }}
              >
                Add
              </button>
            )}

            <button
              onClick={() => {
                onDeleteHandler(data?.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>

        {newNodeId === data.id && (
          <input
            autoFocus={true}
            value={nodeValue}
            onChange={(e) => {
              setnodeValue(e.target.value);
            }}
            onBlur={() => {
              onAddHandler(newNodeId, nodeValue, filetype);
              setNewNodeId(null);
              setnodeValue("");
              setFiletype(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onAddHandler(newNodeId, nodeValue, filetype);
                setNewNodeId(null);
                setnodeValue("");
                setFiletype(true);
              }
            }}
          />
        )}
        {isShow &&
          data.items?.map((elem) => {
            return (
              <div
                key={elem.id}
                style={{
                  marginLeft: "10px",
                  textAlign: "left",
                }}
              >
                <Display
                  data={elem}
                  onDeleteHandler={onDeleteHandler}
                  onAddHandler={onAddHandler}
                  onCheckHandler={onCheckHandler}
                />
              </div>
            );
          })}
      </div>
    )
  );
};
export default Display;
