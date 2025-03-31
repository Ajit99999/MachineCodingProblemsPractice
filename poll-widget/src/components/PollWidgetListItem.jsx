const PollWidgetListItem = ({
  selectedOption,
  value,
  name,
  label,
  onChange,
  voteDone,
  pollData,
  votes,
  isMulti,
}) => {
  //   console.log(
  //     votes,
  //     "votes",
  //     pollData.totalVotes,
  //     "polldata",
  //     (votes / pollData.totalVotes) * 100
  //   );
  const percentageValue = Math.floor((votes / pollData.totalVotes) * 100);

  let checked;
  if (isMulti) {
    checked =
      (Array.isArray(selectedOption) && selectedOption.includes(value)) ||
      false;
  } else {
    checked = selectedOption === value;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "100px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <input
            name={name}
            onChange={onChange}
            // checked={selectedOption === value}
            checked={checked}
            value={value}
            type={`${isMulti ? "checkbox" : "radio"}`}
          />
          <label> {label} </label>
        </div>

        {voteDone && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "2px",
            }}
          >
            <div>Votes: {votes}</div>
            <div>({percentageValue}%)</div>
          </div>
        )}
      </div>
      {voteDone && (
        <div>
          <input
            max={100}
            readOnly={true}
            value={percentageValue}
            min={0}
            type="range"
          />
        </div>
      )}
    </div>
  );
};

export default PollWidgetListItem;
