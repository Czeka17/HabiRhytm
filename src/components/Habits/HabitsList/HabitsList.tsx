import RoutineItem from '../RoutineItem/RoutineItem';
import NewHabitPlaceholder from '../../NewHabit/NewHabitPlaceholder/NewHabitPlaceholder';
import { Link } from 'react-router-dom';
import Button from '../../../UI/Button/Button';
import List from '../../../UI/List/List';
import HabitModalContainer from '../../../containers/HabitModalContainer/HabitModalContainer';
import { useStore } from '../../../context/HabitsContext';
function HabitsGrid() {
  const { Items } = useStore();

  return (
    <div>
      <h2>Your habits</h2>
      <List isAddictionList={true}>
        {Items.filter((habit) => habit.HabitType === `Addiction`).map(
          (habit, index) => (
            <RoutineItem habit={habit} key={index} />
          ),
        )}
      </List>
      <List>
        {Items.filter((habit) => habit.HabitType === `Habit`).map(
          (habit, index) => (
            <RoutineItem habit={habit} key={index} />
          ),
        )}
        <NewHabitPlaceholder />
      </List>

      <Link to="/fill">
        <Button name={`fill your tasks`} />
      </Link>
      <HabitModalContainer />
    </div>
  );
}
export default HabitsGrid;
