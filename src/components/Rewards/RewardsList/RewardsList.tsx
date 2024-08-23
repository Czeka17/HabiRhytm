import { useEffect, useState } from 'react';
import RewardItem from '../RewardItem/RewardItem';
import classes from './RewardsList.module.css';
import { useStore } from '../../../store/HabitsStore';
const DUMMY_REWARDS = [
  { name: `Keep your streak for a week`, condition: `streak-week` },
  { name: `Keep your streak for a month`, condition: `streak-month` },
  { name: `Keep your streak for a year`, condition: `streak-year` },
  {
    name: `Dont let your addiction win for 6 hours`,
    condition: `addiction-6-hours`,
  },
  { name: `Dont let your addiction win for a day`, condition: `addiction-day` },
  {
    name: `Dont let your addiction win for a week`,
    condition: `addiction-week`,
  },
  {
    name: `Dont let your addiction win for a month`,
    condition: `addiction-month`,
  },
  {
    name: `Dont let your addiction win for a year`,
    condition: `addiction-year`,
  },
  { name: `Complete your first challenge`, condition: `first-challenge` },
  { name: `Complete 5 challenges`, condition: `five-challenges` },
  { name: `Complete 10 challenges`, condition: `ten-challenges` },
  { name: `Complete 25 challenges`, condition: `twenty-five-challenges` },
];
function RewardsList() {
  const { items } = useStore((state) => ({
    items: state.Items,
  }));
  const [rewards, setRewards] = useState<any[]>([]);

  // zmienic na state
  useEffect(() => {
    const checkRewards = () => {
      // const currentDate = new Date();
      const updatedRewards = DUMMY_REWARDS.map((reward) => {
        let completed = false;

        switch (reward.condition) {
          case `streak-week`:
            completed = checkStreak(7);
            break;
          case `streak-month`:
            completed = checkStreak(30);
            break;
          case `streak-year`:
            completed = checkStreak(365);
            break;
          case `addiction-6-hours`:
            completed = checkAddiction(6 * 60 * 60 * 1000);
            break;
          case `addiction-day`:
            completed = checkAddiction(24 * 60 * 60 * 1000);
            break;
          case `addiction-week`:
            completed = checkAddiction(7 * 24 * 60 * 60 * 1000);
            break;
          case `addiction-month`:
            completed = checkAddiction(30 * 24 * 60 * 60 * 1000);
            break;
          case `addiction-year`:
            completed = checkAddiction(365 * 24 * 60 * 60 * 1000);
            break;
          case `first-challenge`:
            completed = checkChallenges(1);
            break;
          case `five-challenges`:
            completed = checkChallenges(5);
            break;
          case `ten-challenges`:
            completed = checkChallenges(10);
            break;
          case `twenty-five-challenges`:
            completed = checkChallenges(25);
            break;
          default:
            break;
        }

        return { ...reward, completed };
      });

      setRewards(updatedRewards);
    };

    const checkStreak = (days: number) => {
      console.log(days);
      return false;
    };

    const checkAddiction = (duration: number) => {
      const addictions = items.filter((item) => item.HabitType === `Addiction`);
      const now = new Date().getTime();

      return addictions.some((item) => {
        const addictionTime = new Date(item.time!).getTime();
        const difference = now - addictionTime;
        return difference >= duration;
      });
    };

    const checkChallenges = (count: number) => {
      console.log(count);
      // user will have challanges array
      return false;
    };

    checkRewards();
  }, [items]);
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
