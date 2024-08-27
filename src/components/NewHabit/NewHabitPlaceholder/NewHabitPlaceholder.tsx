import classes from '../../Habits/RoutineItem/RoutineItem.module.css';

interface NewHabitPlaceholderProps {
  OnOpen: () => void;
}
function NewHabitPlaceholder({ OnOpen }: NewHabitPlaceholderProps) {
  return (
    <li className={classes.Item}>
      <p>Add Habit</p>
      <button onClick={OnOpen}>Add</button>
    </li>
  );
}
export default NewHabitPlaceholder;
