import PollWidgetListItem from "./PollWidgetListItem";

const PollWidgetList = ({ pollData, voteDone, options, selectedOption, onChange }) => {
  return (
    <div>
      {options &&
        options.map((option) => {
          return (
            <PollWidgetListItem
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
