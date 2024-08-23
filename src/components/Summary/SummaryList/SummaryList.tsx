import { useStore } from '../../../store/HabitsStore';
import AddictionsSummaryList from '../Addictions/AddictionsSummaryList/AddictionsSummaryList';
import HabitSummaryList from '../Habits/HabitSummaryList/HabitSummaryList';
import classes from './SummaryList.module.css';

function SummaryList() {
  const { items } = useStore((state) => ({
    items: state.Items,
  }));

  return (
    <div className={classes.list}>
      <h2>Summary</h2>
      <AddictionsSummaryList items={items} />
      <HabitSummaryList items={items} />
    </div>
  );
}
export default SummaryList;
