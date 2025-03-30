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
  function onChangeHandler(e) {
    setSelectedOption(e.target.value);
    prevSelectedValue.current = selectedOption;

    const updatedPollDataOptions = pollData.options
      .map((option) => {
        if (option.value === e.target.value) {
          return { ...option, votes: option.votes + 1 };
        } else {
          return option;
        }
      })
      .map((option) => {
        if (option.value === prevSelectedValue.current) {
          return { ...option, votes: option.votes - 1 };
        } else {
          return option;
        }
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

  console.log(pollData, "pollData");

  return (
    <>
      <div className="poll-widget-container">
        <div>
          <p> Question:{pollData.question}</p>
        </div>
        <PollWidgetList
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
          {" "}
          {voteDone && (
            <button
              onClick={() => {
                setVoteDone(false);
                setSelectedOption("");
              }}
            >
              Clear vote
            </button>
          )}
          {voteDone && (
            <button
              onClick={() => {
                setVoteDone(false);
                setSelectedOption("");
                setPollData(data);
              }}
            >
              Reset
            </button>
          )}{" "}
        </div>
       
      </div>
    </>
  );
};

export default PollWidget;
