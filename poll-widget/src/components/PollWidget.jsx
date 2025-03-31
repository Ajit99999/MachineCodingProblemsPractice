import { useRef, useState } from "react";
import PollWidgetList from "./PollWidgetList";
const data = {
  question: "Which language you like the most ?",
  options: [
    {
      id: 1,
      value: "React",
      votes: 0,
      name: "answer",
      label: "React",
    },
    {
      id: 2,
      value: "Angular",
      votes: 0,
      name: "answer",
      label: "Angular",
    },
    {
      id: 3,
      value: "Vue",
      label: "Vue",
      votes: 0,
      name: "answer",
    },
  ],
  totalVotes: 0,
};
const PollWidget = () => {
  const [pollData, setPollData] = useState(data);
  const [selectedOption, setSelectedOption] = useState("");
  const [voteDone, setVoteDone] = useState(false);
  const prevSelectedValue = useRef(null);
  const [isMulti, setIsMulti] = useState(false);

  function onChangeHandler(e) {
    const { value, type, checked } = e.target;

    if (type === "checkbox") {
      if (checked) {
        const updatedPollDataOptions = pollData.options.map((option) => {
          if (option.value === value) {
            return { ...option, votes: option.votes + 1 };
          } else {
            return option;
          }
        });
        updatePollDateFnHandler(updatedPollDataOptions);
        setSelectedOption([...(selectedOption || []), value]);
      } else {
        prevSelectedValue.current = value;
        const updatedPollDataOptions = pollData.options.map((option) => {
          if (option.value === prevSelectedValue.current) {
            return { ...option, votes: option.votes - 1 };
          } else {
            return option;
          }
        });
        updatePollDateFnHandler(updatedPollDataOptions);
        const updatedSelectedOption = selectedOption.filter((option) => {
          return option !== value;
        });
        setSelectedOption(updatedSelectedOption);
      }

      function updatePollDateFnHandler(updatedPollDataOptions) {
        const updatedPollData = {
          ...pollData,
          options: updatedPollDataOptions,
          totalVotes: updatedPollDataOptions.reduce((acc, elem) => {
            return acc + elem.votes;
          }, 0),
        };
        setPollData(updatedPollData);
        setVoteDone(true);
      }
    } else if (type === "radio") {
      setSelectedOption(value);
      prevSelectedValue.current = selectedOption;
      const updatedPollDataOptions = pollData.options.map((option) => {
        if (option.value === value) {
          return { ...option, votes: option.votes + 1 };
        }
        // either you declare an useRef or you can use the state simply
        if (option.value === selectedOption) {
          return { ...option, votes: option.votes - 1 };
        }
        return option;
      });

      const updatedPollData = {
        ...pollData,
        options: updatedPollDataOptions,
        totalVotes: updatedPollDataOptions.reduce((acc, elem) => {
          return acc + elem.votes;
        }, 0),
      };
      setPollData(updatedPollData);
      setVoteDone(true);
    }
  }

  return (
    <>
      <div className="poll-widget-container">
        <div>
          <p> Question:{pollData.question}</p>
        </div>
        <PollWidgetList
          isMulti={isMulti}
          pollData={pollData}
          voteDone={voteDone}
          onChange={onChangeHandler}
          selectedOption={selectedOption}
          options={pollData.options}
        ></PollWidgetList>
        <div
          style={{
            margin: "10px 10px",
            display: "flex",
            gap: "10px",
          }}
        >
          {voteDone && (
            <button
              onClick={() => {
                setVoteDone(false);
                setSelectedOption(isMulti ? [] : "");
              }}
            >
              Clear vote
            </button>
          )}
          {voteDone && (
            <button
              onClick={() => {
                setVoteDone(false);
                // depend upon isMulti, resetting the value selectedOption
                setSelectedOption(isMulti ? [] : "");
                setPollData(data);
              }}
            >
              Reset
            </button>
          )}
          {!voteDone && (
            <button
              onClick={() => {
                setIsMulti((prev) => {
                  return !prev;
                });
              }}
            >
              {!isMulti ? "Enable Multi-Check" : "Disable Multi-Check"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default PollWidget;
