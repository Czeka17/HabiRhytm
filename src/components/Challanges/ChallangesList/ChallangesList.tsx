import List from '../../../UI/List/List';
import ChallangeItem from '../ChallangeItem/ChallangeItem';

interface challange {
  id: number;
  habitName: string;
  HabitType: string;
  time?: Date;
  Unit?: string;
  goal?: { min?: number; max?: number };
  data?: { date: string; value: number; mood?: string }[];
}
const DUMMY_CHALLANGES: challange[] = [
  {
    id: 5234,
    habitName: `Dont drink alcohol for a week`,
    HabitType: `Addiction`,
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
  return (
    <div>
      <List>
        {DUMMY_CHALLANGES.map((chall, index) => (
          <ChallangeItem challange={chall} key={index} />
        ))}
      </List>
    </div>
  );
}
export default ChallangesList;
