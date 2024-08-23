import { useStore } from '../../../context/HabitsContext';
import classes from '../../Habits/RoutineItem/RoutineItem.module.css';
function NewHabitPlaceholder() {
  const { ToggleModal } = useStore();

  return (
    <li className={classes.Item}>
      <p>Add Habit</p>
      <button onClick={ToggleModal}>Add</button>
    </li>
  );
}
export default NewHabitPlaceholder;
