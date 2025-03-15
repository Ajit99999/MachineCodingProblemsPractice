const ListItem = ({
  onClickhandlerListItem,
  title = "default list Item",
  isHighlighted,
}) => {
  return (
    <li
      style={{
        width: "100%",
        height: "100%",
        listStyle: "none",
        textAlign: "left",
        borderRadius: "5px",
        cursor: "pointer",
        margin: "2px",
      }}
      className={`list-item ${isHighlighted ? 'highlighted' : ''}`}
      onMouseDown={(e) => {
        onClickhandlerListItem(title);
      }}
    >
      {title}
    </li>
  );
};
export default ListItem;
