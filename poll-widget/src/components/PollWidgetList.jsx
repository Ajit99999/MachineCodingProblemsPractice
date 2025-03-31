import PollWidgetListItem from "./PollWidgetListItem";

const PollWidgetList = ({ isMulti, pollData, voteDone, options, selectedOption, onChange }) => {
  return (
    <div>
      {options &&
        options.map((option) => {
          return (
            <PollWidgetListItem
            isMulti={isMulti}
            pollData={pollData}
            voteDone = {voteDone}
              onChange={onChange}
              selectedOption={selectedOption}
              key={option.id}
              {...option}
            />
          );
        })}
    </div>
  );
};

export default PollWidgetList;
