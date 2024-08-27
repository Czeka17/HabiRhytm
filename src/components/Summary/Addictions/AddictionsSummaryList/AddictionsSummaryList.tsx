import List from '../../../../UI/List/List';
import AddictionsSummaryItem from '../AddictionsSummaryItem/AddictionsSummaryItem';
import { HabitAddictionItem } from '../../../../types/types';
interface AddictionsSummaryListProps {
  items: HabitAddictionItem[];
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
