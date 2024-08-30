import List from '../../../UI/List/List';
import ChallangeItem from '../ChallangeItem/ChallangeItem';
import { useStore } from '../../../context/HabitsContext';
import { HabitAddictionItem } from '../../../types/types';

const DUMMY_CHALLANGES: HabitAddictionItem[] = [
  {
    id: 5234,
    habitName: `Dont drink alcohol for a week`,
    HabitType: `Addiction`,
    time: new Date(),
  },
  {
    id: 5235,
    habitName: `Drink 2L of water a day`,
    HabitType: `Habit`,
    Unit: `litre`,
    goal: { min: 2 },
    data: [],
  },
];

function ChallangesList() {
  const { addChallangeHandler, Items } = useStore();

  function challangeIsTaken(challangeId: number): boolean {
    return Items.some((item) => item.id === challangeId);
  }
  return (
    <div>
      <List>
        {DUMMY_CHALLANGES.map((chall, index) => (
          <ChallangeItem
            challange={chall}
            key={index}
            OnAddChallange={addChallangeHandler}
            IsChallangeTaken={challangeIsTaken}
          />
        ))}
      </List>
    </div>
  );
}
export default ChallangesList;
