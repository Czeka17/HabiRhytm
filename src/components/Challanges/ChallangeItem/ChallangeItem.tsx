import { Button } from '../../../UI/Button/Button';
import classes from './ChallangeItem.module.css';
import { HabitAddictionItem } from '../../../types/types';

interface ChallangeItemProps {
  challange: HabitAddictionItem;
  OnAddChallange: (habit: HabitAddictionItem) => void;
  IsChallangeTaken: (challangeId: number) => boolean;
}
function ChallangeItem({
  challange,
  OnAddChallange,
  IsChallangeTaken,
}: ChallangeItemProps) {
  return (
    <li
      className={`${classes.ChallangeCard} ${IsChallangeTaken(challange.id) ? classes.ChallangeTaken : ``}`}
    >
      <p>{challange.habitName}</p>
      <p>{challange.HabitType}</p>
      {challange?.goal?.min && (
        <p>
          min:{challange.goal.min} {challange.Unit}
        </p>
      )}
      {!IsChallangeTaken(challange.id) ? (
        <Button onClick={() => OnAddChallange(challange)}>
          Start challange
        </Button>
      ) : (
        <p>Challange Taken</p>
      )}
    </li>
  );
}
export default ChallangeItem;
