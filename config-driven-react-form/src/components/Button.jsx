const Button = ({ type = "button", onClick, label = "Btn" }) => {
  return (
    <div>
      <button type={type} onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

export default Button;
