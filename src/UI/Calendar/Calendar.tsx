import { format, subDays } from 'date-fns';
interface CalendarWeekProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date) => void;
}
const CalendarWeek = ({ selectedDate, onSelectDate }: CalendarWeekProps) => {
  const getLastWeekDates = () => {
    const today = new Date();
    const week = [];

    for (let i = 6; i >= 0; i--) {
      const date = subDays(today, i);
      week.push(date);
    }

    return week;
  };
  const dates = getLastWeekDates();

  return (
    <div className="flex justify-center space-x-4">
      {dates.map((date) => (
        <div
          key={date.toISOString()}
          onClick={() => onSelectDate(date)}
          className={`cursor-pointer text-center p-4 rounded-md border ${
            selectedDate?.toDateString() === date.toDateString()
              ? `bg-blue-500 text-white`
              : `bg-white text-black`
          }`}
        >
          <div className="font-bold">{format(date, `MMMM`)}</div>
          <div className="text-2xl">{format(date, `d`)}</div>
          <div className="font-medium">{format(date, `EEEE`)}</div>
        </div>
      ))}
    </div>
  );
};

export default CalendarWeek;
