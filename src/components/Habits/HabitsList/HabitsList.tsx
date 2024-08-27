import RoutineItem from '../RoutineItem/RoutineItem';
import NewHabitPlaceholder from '../../NewHabit/NewHabitPlaceholder/NewHabitPlaceholder';
import { Link } from 'react-router-dom';
import { Button } from '../../../UI/Button/Button';
import List from '../../../UI/List/List';
import { HabitAddictionItem } from '../../../types/types';
interface HabitsListProps {
  Items: HabitAddictionItem[];
  OnOpen: () => void;
  OnSelect: (id: number | null) => void;
}
function HabitsList({ Items, OnOpen, OnSelect }: HabitsListProps) {
  return (
    <div>
      <h2>Your habits</h2>
      <List isAddictionList={true}>
        {Items.filter((habit) => habit.HabitType === `Addiction`).map(
          (habit, index) => (
            <RoutineItem
              habit={habit}
              key={index}
              OnOpen={OnOpen}
              OnSelect={OnSelect}
            />
          ),
        )}
      </List>
      <List>
        {Items.filter((habit) => habit.HabitType === `Habit`).map(
          (habit, index) => (
            <RoutineItem
              habit={habit}
              key={index}
              OnOpen={OnOpen}
              OnSelect={OnSelect}
            />
          ),
        )}
        <NewHabitPlaceholder OnOpen={OnOpen} />
      </List>

      <Link to="/fill">
        <Button>fill your tasks</Button>
      </Link>
    </div>
  );
}
export default HabitsList;
