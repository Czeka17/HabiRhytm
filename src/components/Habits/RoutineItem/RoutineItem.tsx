import { useStore } from '../../../context/HabitsContext';
import { getTimeDifference } from '../../../lib/lib';
import editSVG from '../../../static/edit.svg';
import deleteSVG from '../../../static/delete.svg';
import resetSVG from '../../../static/reset.svg';
import classes from './RoutineItem.module.css';
import { HabitAddictionItem } from '../../../types/types';
interface HabitItemProps {
  habit: HabitAddictionItem;
  OnOpen: () => void;
  OnSelect: (id: number | null) => void;
}

function RoutineItem({ habit, OnOpen, OnSelect }: HabitItemProps) {
  const { DeleteItemHandler, ResetAddictionTimer } = useStore();
  const handleEditClick = () => {
    OnSelect(habit.id);
    OnOpen();
  };

  const timeDifference = habit.time ? getTimeDifference(habit.time) : null;

  return (
    <li className={`${classes.Item} ${habit.time && classes.addiction}`}>
      <p>{habit.habitName}</p>
      {timeDifference && <p>{timeDifference}</p>}

      <div>
        {habit.HabitType === `Addiction` && (
          <button
            className={classes.button}
            onClick={() => ResetAddictionTimer(habit.id)}
          >
            <img src={resetSVG} />
          </button>
        )}
        <button className={classes.button} onClick={() => handleEditClick()}>
          <img src={editSVG} />
        </button>
        <button
          className={classes.button}
          onClick={() => DeleteItemHandler(habit.id)}
        >
          <img src={deleteSVG} />
        </button>
      </div>
    </li>
  );
}

export default RoutineItem;
