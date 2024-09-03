import RewardItem from '../RewardItem/RewardItem';
import classes from './RewardsList.module.css';

interface RewardItem {
  name: string;
  condition: string;
  experience: number;
  isCompleted: boolean;
}
interface RewardsListProps {
  rewards: RewardItem[];
}
function RewardsList({ rewards }: RewardsListProps) {
  return (
    <div>
      <ul className={classes.RewardList}>
        {rewards.map((reward, index) => (
          <RewardItem key={index} reward={reward} />
        ))}
      </ul>
    </div>
  );
}
export default RewardsList;
