const PollWidgetListItem = ({
  selectedOption,
  value,
  name,
  label,
  onChange,
  voteDone,
  pollData,
  votes,
}) => {
  //   console.log(
  //     votes,
  //     "votes",
  //     pollData.totalVotes,
  //     "polldata",
  //     (votes / pollData.totalVotes) * 100
  //   );
  const percentageValue = Math.floor((votes / pollData.totalVotes) * 100);
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
            checked={selectedOption === value}
            value={value}
            type="radio"
          />
          <label> {label} </label>
        </div>

        {voteDone && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div>Votes: {votes}</div>
            <div>{percentageValue}%</div>
          </div>
        )}
      </div>
      {voteDone && (
        <div>
          <input max={100} value={percentageValue} min={0} type="range" />
        </div>
      )}
    </div>
  );
};

export default PollWidgetListItem;
