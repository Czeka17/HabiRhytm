import { useEffect, useState } from 'react';
import { useStore } from '../../context/HabitsContext';
import { useExperience } from '../../context/ExperienceContext';
import RewardsList from '../../components/Rewards/RewardsList/RewardsList';
const DUMMY_REWARDS = [
  {
    name: `Keep your streak for a week`,
    condition: `streak-week`,
    experience: 40,
    isCompleted: false,
  },
  {
    name: `Keep your streak for a month`,
    condition: `streak-month`,
    experience: 100,
    isCompleted: false,
  },
  {
    name: `Keep your streak for a year`,
    condition: `streak-year`,
    experience: 1000,
    isCompleted: false,
  },
  {
    name: `Dont let your addiction win for 6 hours`,
    condition: `addiction-6-hours`,
    experience: 20,
    isCompleted: false,
  },
  {
    name: `Dont let your addiction win for a day`,
    condition: `addiction-day`,
    experience: 30,
    isCompleted: false,
  },
  {
    name: `Dont let your addiction win for a week`,
    condition: `addiction-week`,
    experience: 40,
    isCompleted: false,
  },
  {
    name: `Dont let your addiction win for a month`,
    condition: `addiction-month`,
    experience: 100,
    isCompleted: false,
  },
  {
    name: `Dont let your addiction win for a year`,
    condition: `addiction-year`,
    experience: 1000,
    isCompleted: false,
  },
  {
    name: `Complete your first challenge`,
    condition: `first-challenge`,
    experience: 30,
    isCompleted: false,
  },
  {
    name: `Complete 5 challenges`,
    condition: `five-challenges`,
    experience: 150,
    isCompleted: false,
  },
  {
    name: `Complete 10 challenges`,
    condition: `ten-challenges`,
    experience: 300,
    isCompleted: false,
  },
  {
    name: `Complete 25 challenges`,
    condition: `twenty-five-challenges`,
    experience: 750,
    isCompleted: false,
  },
];
interface RewardItem {
  name: string;
  condition: string;
  experience: number;
  isCompleted: boolean;
}
function RewardsListContainer() {
  const { Items } = useStore();
  const { addExperienceHandler } = useExperience();
  const [rewards, setRewards] = useState<RewardItem[]>([]);

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
        if (completed && reward.isCompleted === false) {
          reward.isCompleted = true;
          addExperienceHandler(reward.experience);
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
      const addictions = Items.filter((item) => item.HabitType === `Addiction`);
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
  }, [Items]);
  return <RewardsList rewards={rewards} />;
}
export default RewardsListContainer;
