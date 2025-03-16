import { useState } from "react";
import "./App.css";
import Input from "./components/Input";
import Button from "./components/Button";

const formList = [
  {
    label: "Name",
    type: "text",
    name: "name",
    value: "",
    placeholder: "Enter your name",
  },
  {
    label: "Email",
    type: "email",
    name: "email",
    value: "",
    placeholder: "Enter your email",
  },
  {
    label: "Male",
    type: "radio",
    name: "gender",
    value: "male",
    checked: false,
  },
  {
    label: "Female",
    type: "radio",
    name: "gender",
    value: "female",
    checked: false,
  },
  {
    label: "Cricket",
    type: "checkbox",
    name: "hobbies",
    value: "cricket",
    checked: false,
  },
  {
    label: "Football",
    type: "checkbox",
    name: "hobbies",
    value: "football",
    checked: false,
  },
  {
    label: "Hockey",
    type: "checkbox",
    name: "hobbies",
    value: "hockey",
    checked: false,
  },
];
function App() {
  const [formState, setFormState] = useState({});
  const [errorState, setErrorState] = useState({});
  function onChangeHandler(e) {
    setErrorState((prev) => {
      return { ...prev, [name]: "" };
    });
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      let existingValue = formState[name] || [];
      if (checked) {
        setFormState({ ...formState, [name]: [...existingValue, value] });
      } else {
        existingValue = existingValue.filter((elem) => elem !== value);
        setFormState({ ...formState, [name]: existingValue });
      }
    } else {
      setFormState({ ...formState, [name]: value });
    }
  }
  function onFormHandler(e) {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    alert(JSON.stringify(formState));
    setFormState({});
    setErrorState({});
  }
  function isValidate(name, type, value) {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      if (type === "text" && name === "name") return "Please enter your name.";
      if (type === "email") return "Please enter your email.";
      if (type === "radio") return "Please select a gender.";
      if (type === "checkbox") return "Please select at least one hobby.";
    }
    if (type === "email" && !/\S+@\S+\.\S+/.test(value)) {
      return "Please enter a valid email address.";
    }
    return "";
  }
  function validateForm() {
    let errors = {};
    let isValid = true;

    formList.forEach((elem) => {
      const error = isValidate(elem.name, elem.type, formState[elem.name]);
      if (error) {
        isValid = false;
        errors = { ...errors, [elem.name]: error };
      }
    });

    setErrorState(errors);
    return isValid;
  }
  console.log(formState, "formState");
  console.log(errorState, "errorState");
  return (
    <>
      <form>
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            padding: "20px 25px",
            height: "auto",
            width: "auto",
            border: "1px solid black",
            textAlign: "left",
          }}
        >
          {formList &&
            formList.map((list) => {
              return (
                <div key={list.label}>
                  <Input
                    name={list.name}
                    onChange={onChangeHandler}
                    type={list.type}
                    label={list.label}
                    placeholder={list.placeholder}
                    value={
                      list.type === "radio" || list.type === "checkbox"
                        ? list.value
                        : formState[list.name] || list.value
                    }
                    checked={
                      list.type === "radio"
                        ? formState[list.name] === list.value
                        : list.type === "checkbox"
                        ? Array.isArray(formState[list.name]) &&
                          formState[list.name].includes(list.value)
                        : list.value
                    }
                  />
                  {errorState[list.name] && (
                    <div
                      style={{
                        color: "red",
                      }}
                    >
                      {" "}
                      {errorState[list.name]}
                    </div>
                  )}
                </div>
              );
            })}
          <Button onClick={onFormHandler} type="submit" label="Submit"></Button>
        </div>
      </form>
    </>
  );
}

export default App;
