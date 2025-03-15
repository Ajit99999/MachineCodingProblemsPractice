import ListItem from "../components/ListItem";
const SearchAutoComplete = ({
  onClickhandlerListItem,
  onFocusHandler,
  onBlurHandler,
  isShowDropDown,
  listData,
  selectedData,
  onChangeHandler,
  isHighlightedIndex,
  onKeyDownHandler
}) => {
  return (
    <div>
      <input
        style={{
          width: "500px",
          height: "auto",
          border: "1px solid black",
          borderRadius: "5px 5px",
          outline: "none",
          padding: "10px 5px",
        }}
        type="text"
        value={selectedData}
        onChange={(e) => {
          onChangeHandler(e);
        }}
        autoFocus={true}
        onBlur={() => {
          onBlurHandler();
        }}
        onFocus={() => {
          onFocusHandler();
        }}
        onKeyDown={(e) => {
          onKeyDownHandler(e);
        }}
      ></input>
      {listData && isShowDropDown && (
        <ul
          style={{
            width: "480px",
            height: "auto",
            border: "1px solid black",
            borderRadius: "5px 5px",
            padding: "5px 15px",
            margin: "5px 15px",
          }}
        >
          {listData.map((list, index) => {
            return (
              <ListItem
                isHighlighted={isHighlightedIndex === index}
                onClickhandlerListItem={onClickhandlerListItem}
                key={list?.id}
                title={list?.title}
              />
            );
          })}
          {listData?.length === 0 && <li> No data found </li>}
        </ul>
      )}
    </div>
  );
};
export default SearchAutoComplete;
