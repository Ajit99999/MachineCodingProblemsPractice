const Input = ({
  label,
  type = "text",
  onChange,
  name,
  value,
  placeholder,
  checked
}) => {

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "5px",
      }}
    >
      <label>{label}</label>
      <input
        onChange={onChange}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        checked={checked}
      />
    </div>
  );
};

export default Input;
