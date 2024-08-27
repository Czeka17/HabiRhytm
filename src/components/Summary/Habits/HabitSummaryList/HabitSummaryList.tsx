import AiGeneratedChart from '../AiGeneratedChart/AiGeneratedChart';
import HabitSummaryItem from '../HabitSummaryItem/HabitSummaryItem';
import classes from './HabitSummaryList.module.css';
import { HabitAddictionItem } from '../../../../types/types';

interface HabitSummaryListProps {
  items: HabitAddictionItem[];
}
function HabitSummaryList({ items }: HabitSummaryListProps) {
  const Mood = items.find((item) => item.HabitType === `Mood`);
  return (
    <div>
      <div>
        <ul className={classes.HabitSummaryList}>
          <HabitSummaryItem item={Mood!} />
          {items
            .filter((item) => item.HabitType === `Habit`)
            .map((habit, index) => (
              <HabitSummaryItem key={index} item={habit} />
            ))}
          <AiGeneratedChart />
        </ul>
      </div>
    </div>
  );
}
export default HabitSummaryList;
