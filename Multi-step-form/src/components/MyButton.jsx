import '../App.css';
const MyButton = ({ title, type, onClickHandler }) => {
 
  return (
    <div className='flex-items' >
      <button type={type} id={title} onClick={onClickHandler}>
        {title}
      </button>
    </div>
  );
};

export default MyButton;
