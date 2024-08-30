import AiGeneratedChart from '../AiGeneratedChart/AiGeneratedChart';
import classes from './HabitSummaryList.module.css';
import { HabitAddictionItem } from '../../../../types/types';
import HabitSummaryItemContainer from '../../../../containers/HabitSummaryItem/HabitSummaryItemContainer';

interface HabitSummaryListProps {
  items: HabitAddictionItem[];
}
function HabitSummaryList({ items }: HabitSummaryListProps) {
  const Mood = items.find((item) => item.HabitType === `Mood`);
  return (
    <div>
      <div>
        <ul className={classes.HabitSummaryList}>
          <HabitSummaryItemContainer item={Mood!} />
          {items
            .filter((item) => item.HabitType === `Habit`)
            .map((habit, index) => (
              <HabitSummaryItemContainer key={index} item={habit} />
            ))}
          <AiGeneratedChart />
        </ul>
      </div>
    </div>
  );
}
export default HabitSummaryList;
