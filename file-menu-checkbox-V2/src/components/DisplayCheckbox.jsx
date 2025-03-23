const DisplayCheckbox = ({ fileData, onChangeHandler, map }) => {
  return (
    <div
      style={{
        textAlign: "left",
        marginLeft: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <input
          type="checkbox"
          checked={map.get(fileData.id)?.checked || false}
          onChange={(e) => {
            onChangeHandler(e, fileData.id);
          }}
        />
        {fileData.name}
      </div>
      {fileData.children &&
        fileData.children.map((elem) => {
          return (
            <DisplayCheckbox
              key={elem.id}
              onChangeHandler={onChangeHandler}
              fileData={elem}
              map={map}
            />
          );
        })}
    </div>
  );
};

export default DisplayCheckbox;
