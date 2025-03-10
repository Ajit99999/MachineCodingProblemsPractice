import React, { useState } from "react";

const Display = ({ data, onChangeHandler }) => {
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
            checked={data.done}
            onChange={(e) => {
              onChangeHandler(e.target.checked, data.id);
            }}
          />

          <div>{data.name}</div>
        </div>

        {data.items?.map((elem) => {
          return (
            <div
              key={elem.id}
              style={{
                marginLeft: "10px",
                textAlign: "left",
              }}
            >
              <Display data={elem} onChangeHandler={onChangeHandler} />
            </div>
          );
        })}
      </div>
    )
  );
};
export default Display;
