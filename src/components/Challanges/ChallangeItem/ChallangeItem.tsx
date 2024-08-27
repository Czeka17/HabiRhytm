import { Button } from '../../../UI/Button/Button';
import classes from './ChallangeItem.module.css';
import { HabitAddictionItem } from '../../../types/types';

interface ChallangeItemProps {
  challange: HabitAddictionItem;
  OnAddChallange: (habit: HabitAddictionItem) => void;
}
function ChallangeItem({ challange, OnAddChallange }: ChallangeItemProps) {
  return (
    <li className={classes.ChallangeCard}>
      <p>{challange.habitName}</p>
      <p>{challange.HabitType}</p>
      {challange?.goal?.min && (
        <p>
          min:{challange.goal.min} {challange.Unit}
        </p>
      )}
      <Button onClick={() => OnAddChallange(challange)}>Start challange</Button>
    </li>
  );
}
export default ChallangeItem;
