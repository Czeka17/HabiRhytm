import List from '../../../../UI/List/List';
import AddictionsSummaryItem from '../AddictionsSummaryItem/AddictionsSummaryItem';
interface Habit {
  id: number;
  habitName: string;
  HabitType: string;
  time?: Date;
  goal?: {
    min: number;
    max: number;
  };
}
interface AddictionsSummaryListProps {
  items: Habit[];
}
function AddictionsSummaryList({ items }: AddictionsSummaryListProps) {
  return (
    <div>
      <List isAddictionList={true}>
        {items
          .filter((item) => item.HabitType === `Addiction`)
          .map((item, index) => (
            <AddictionsSummaryItem key={index} item={item} />
          ))}
      </List>
    </div>
  );
}
export default AddictionsSummaryList;
