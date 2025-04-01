const ToastItem = ({ id, position, label, onClick, show, type }) => {
  return (
    <>
      {show && (
        <div className={`toast-container  ${type}`}>
          <div> {label} </div>
          <button onClick={onClick.bind(this,id)}> X </button>
        </div>
      )}
    </>
  );
};
export default ToastItem;
