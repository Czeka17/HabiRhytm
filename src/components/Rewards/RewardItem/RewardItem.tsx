import svg from '../../../static/reward.svg';
import classes from './RewardItem.module.css';
interface RewardItemProps {
  reward: { name: string; condition: string; completed: boolean };
}
function RewardItem({ reward }: RewardItemProps) {
  return (
    <li
      className={`${classes.Reward} ${reward.completed ? classes.Completed : ``}`}
    >
      <img className={classes.RewardItemSVG} src={svg} />
      <p>{reward.name}</p>
    </li>
  );
}
export default RewardItem;
