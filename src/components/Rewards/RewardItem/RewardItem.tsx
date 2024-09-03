import svg from '../../../static/reward.svg';
import classes from './RewardItem.module.css';
interface RewardItemProps {
  reward: {
    name: string;
    condition: string;
    isCompleted: boolean;
    experience: number;
  };
}
function RewardItem({ reward }: RewardItemProps) {
  return (
    <li
      className={`${classes.Reward} ${reward.isCompleted ? classes.Completed : ``}`}
    >
      <img className={classes.RewardItemSVG} src={svg} />
      <p>{reward.name}</p>
    </li>
  );
}
export default RewardItem;
