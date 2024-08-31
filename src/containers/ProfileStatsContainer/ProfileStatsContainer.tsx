import ProfileSummary from '../../components/Profile/ProfileSummary/ProfileSummary';
import ProfileStats from '../../components/Profile/ProfileStats/ProfileStats';
import { useStore } from '../../context/HabitsContext';

function ProfileStatsContainer() {
  const { Items } = useStore();

  function CalculateAverageHappiness() {
    let totalHappiness = 0;
    let totalValuesCount = 0;
    Items.forEach((item) => {
      if (item.data) {
        const itemTotal = item.data.reduce((acc, curr) => acc + curr.value, 0);
        totalHappiness += itemTotal;
        totalValuesCount += item.data.length;
      }
    });

    const averageHappiness =
      totalValuesCount > 0 ? totalHappiness / totalValuesCount : 0;

    return averageHappiness;
  }
  const overallHappiness = CalculateAverageHappiness();
  const moodItem = Items.find((item) => item.HabitType === `Mood`);
  const daysDone = moodItem?.data?.length;
  const mostOftenHumor = () => {
    const moodCounts: { [key: string]: number } = {
      angry: 0,
      sad: 0,
      happy: 0,
      calm: 0,
    };

    moodItem?.data?.forEach((data) => {
      if (data.mood) {
        moodCounts[data.mood]++;
      }
    });

    const maxCount = Math.max(...Object.values(moodCounts));
    const mostFrequentMoods = Object.keys(moodCounts).filter(
      (mood) => moodCounts[mood] === maxCount,
    );

    return mostFrequentMoods;
  };

  const mostFrequentMoods = mostOftenHumor();
  return (
    <div>
      <ProfileSummary overallHappiness={overallHappiness} />
      <ProfileStats
        overallHappiness={overallHappiness}
        daysDone={daysDone}
        mostFrequentMoods={mostFrequentMoods}
      />
    </div>
  );
}
export default ProfileStatsContainer;
