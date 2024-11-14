import '../App.css';
const MyInput = ({ label, type, id, value, onChangeHandler, name }) => {

  return (
    <div
      className="flex-container"
    >
      <div className='flex-items' >
        <label htmlFor={id}>  { label} </label>
      </div>
      <div className='flex-items' >
        <input type={type} id={id} value={value} onChange={onChangeHandler} name={name} />
      </div>
    </div>
  );
};
export default MyInput;
