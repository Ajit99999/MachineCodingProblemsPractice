import { useEffect, useState } from "react";
import "./App.css";
import MyButton from "./components/MyButton";
import MyInput from "./components/MyInput";
import { loginFormList } from "./config/config";

const stepper = 100 / loginFormList.length;

function App() {
  const [currentField, setCurrentField] = useState(0);
  const [formState, setFormState] = useState({});
  const [progressValue, setProgressValue] = useState(0);
  const [finished, setFinished] = useState(false);
  const onChangeHandler = (e) => {
    if (e.target.value === "") {
      setFormState({
        ...formState,
        [e.target.id]: {
          [e.target.id]: e.target.value,
          isError: "should not be empty.",
        },
      });
      return;
    }
    setFormState({
      ...formState,
      [e.target.id]: {
        [e.target.id]: e.target.value,
        isError: "",
      },
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (finished) {
      setTimeout(() => {
        alert(JSON.stringify(formState));
        setCurrentField(0);
        setFormState({});
        setProgressValue(0);
        setFinished(false);
        return;
      }, 500);
      return;
    }
  };

  return (
    <>
      <div>
        <h2> Multi Step Form</h2>
      </div>
      <div
        style={{
          width: "420px",
          height: "15px",
          backgroundColor: "#e0e0e0",
          borderRadius: "8px",
          margin: "10px 0px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressValue}%`,
            borderRadius: "8px",
            backgroundColor: "#3b82f6",
            transition: "width 0.4s ease-in-out",
          }}
        />
      </div>
      <div
        style={{
          border: "1px solid black",
          padding: "10px 10px",
          height: "auto",
          width: "400px",
        }}
      >
        <form onSubmit={onSubmitHandler}>
          <div className="flex-container">
            {!(currentField === 0) && (
              <MyButton
                title={"Back"}
                type={"button"}
                onClickHandler={(e) => {
                  if (formState[loginFormList[currentField]?.id]?.["isError"]) {
                    setFormState({
                      ...formState,
                      [loginFormList[currentField]?.id]: {
                        [loginFormList[currentField]?.id]:
                          formState[loginFormList[currentField]?.id]?.[
                            loginFormList[currentField]?.id
                          ],
                        isError: "",
                      },
                    });
                  }
                  setProgressValue((prev) => prev - stepper);
                  setCurrentField(currentField - 1);
                  setFinished(false);
                }}
              />
            )}
          </div>
          <div>
            <MyInput
              label={loginFormList[currentField]?.label}
              id={loginFormList[currentField]?.id}
              value={
                formState[loginFormList[currentField]?.id]?.[
                  loginFormList[currentField]?.id
                ]
                  ? formState[loginFormList[currentField]?.id]?.[
                      loginFormList[currentField]?.id
                    ]
                  : ""
              }
              type={loginFormList[currentField]?.type}
              onChangeHandler={onChangeHandler}
              name={loginFormList[currentField]?.name}
            />
          </div>
          {formState[loginFormList[currentField]?.id]?.["isError"] && (
            <div
              style={{
                justifyContent: "flex-start",
                marginLeft: "-100px",
                marginTop: "-20px",
                color: "red",
              }}
            >
              <p>
                {loginFormList[currentField]?.label}{" "}
                {formState[loginFormList[currentField]?.id]?.["isError"]}
              </p>
            </div>
          )}

          <div
            className="flex-container"
            style={{
              justifyContent: "flex-end",
            }}
          >
            <MyButton
              title={"Next"}
              type={
                currentField + 1 === loginFormList.length ? "submit" : "button"
              }
              onClickHandler={() => {
                if (
                  !formState[loginFormList[currentField]?.id]?.[
                    loginFormList[currentField]?.id
                  ]
                ) {
                  setFormState({
                    ...formState,
                    [loginFormList[currentField]?.id]: {
                      [loginFormList[currentField]?.id]: "",
                      isError: "should not be empty",
                    },
                  });
                  return;
                }
                if (loginFormList[currentField]?.id === "contact") {
                  if (
                    formState[loginFormList[currentField]?.id]?.[
                      loginFormList[currentField]?.id
                    ].length !== 10
                  ) {
                    setFormState({
                      ...formState,
                      [loginFormList[currentField]?.id]: {
                        [loginFormList[currentField]?.id]:
                          formState[loginFormList[currentField]?.id][
                            loginFormList[currentField]?.id
                          ],
                        isError: "should be 10 digits",
                      },
                    });
                    return;
                  }
                } else if (loginFormList[currentField]?.id === "email") {
                  if (
                    !formState[loginFormList[currentField]?.id]?.[
                      loginFormList[currentField]?.id
                    ].includes("@")
                  ) {
                    setFormState({
                      ...formState,
                      [loginFormList[currentField]?.id]: {
                        [loginFormList[currentField]?.id]:
                          formState[loginFormList[currentField]?.id][
                            loginFormList[currentField]?.id
                          ],
                        isError: "should be a valid value.",
                      },
                    });
                    return;
                  }
                }
                // setProgressValue((prev) => prev + stepper);
                // setCurrentField(currentField + 1);

                if (currentField < loginFormList.length - 1) {
                  setProgressValue((prev) => prev + stepper);
                  setCurrentField(currentField + 1);
                } else {
                  setProgressValue(100);
                  setFinished(true);
                }
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
