import classes from './HabitSummaryItem.module.css';
import { HabitAddictionItem } from '../../../../types/types';
import { ReactNode } from 'react';
import { Button } from '../../../../UI/Button/Button';

interface HabitsSummaryItemProps {
  children: ReactNode;
  item: HabitAddictionItem;
  OnEvaluateValues: (item: HabitAddictionItem) => void;
  OnMoodCheck: () => void;
  OnChangeChart: () => void;
  moodStatus: string;
  weekStatus: string;
}

function HabitSummaryItem({
  children,
  item,
  OnEvaluateValues,
  OnMoodCheck,
  OnChangeChart,
  moodStatus,
  weekStatus,
}: HabitsSummaryItemProps) {
  return (
    <div className={classes.habitSummaryItem}>
      <div className={classes.habitSummaryItemName}>
        <p>{item.habitName}</p>
        <Button onClick={() => OnEvaluateValues(item)}>Get result</Button>
        <p>{weekStatus}</p>
        {item.HabitType === `Mood` && (
          <div>
            <Button onClick={() => OnMoodCheck()}>Get result mood</Button>
            <p>{moodStatus}</p>
          </div>
        )}
        <Button onClick={() => OnChangeChart()}>Change</Button>
      </div>
      {children}
    </div>
  );
}

export default HabitSummaryItem;
