import { useStore } from '../../../context/HabitsContext';
import AddictionsSummaryList from '../Addictions/AddictionsSummaryList/AddictionsSummaryList';
import HabitSummaryList from '../Habits/HabitSummaryList/HabitSummaryList';
import classes from './SummaryList.module.css';

function SummaryList() {
  const { Items } = useStore();

  return (
    <div className={classes.list}>
      <h2>Summary</h2>
      <AddictionsSummaryList items={Items} />
      <HabitSummaryList items={Items} />
    </div>
  );
}
export default SummaryList;
