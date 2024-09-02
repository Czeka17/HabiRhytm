import ProfileSummary from '../../components/Profile/ProfileSummary/ProfileSummary';
import ProfileStats from '../../components/Profile/ProfileStats/ProfileStats';
import { useStore } from '../../context/HabitsContext';
import { useState, useEffect } from 'react';

function ProfileStatsContainer() {
  const { Items } = useStore();
  const [correlationDescriptions, setCorrelationDescriptions] = useState<
    string[]
  >([]);

  const moodItem = Items.find((item) => item.HabitType === `Mood`);
  const habits = Items.filter((item) => item.HabitType === `Habit`);
  const addictions = Items.filter((item) => item.HabitType === `Addiction`);
  const daysDone = moodItem?.data?.length;

  function analyzeMoodCorrelation() {
    if (!moodItem || !moodItem.data) return;

    const descriptions: string[] = [];

    moodItem.data.forEach((moodData) => {
      const mood = moodData.mood;
      const date = moodData.date;

      habits.forEach((habit) => {
        const habitData = habit.data?.find((data) => data.date === date);

        if (habitData) {
          if (
            habit.goal?.max !== undefined &&
            habitData.value > habit.goal.max
          ) {
            descriptions.push(
              `On ${date}, You was ${mood} because You exceeded the goal in habit ${habit.habitName}.`,
            );
          } else if (
            habit.goal?.min !== undefined &&
            habitData.value < habit.goal.min
          ) {
            descriptions.push(
              `On ${date}, You was ${mood} because You didn't reach the goal in habit ${habit.habitName}.`,
            );
          }
        }
      });
    });

    setCorrelationDescriptions(descriptions);
  }

  function CheckAddictionBreak() {
    let weekend = 0;
    let weekday = 0;

    addictions.forEach((addiction) => {
      if (addiction.addictionData) {
        addiction.addictionData.forEach((dateString) => {
          const date = new Date(dateString);
          const day = date.getDay();

          if (day === 0 || day === 5 || day === 6) {
            weekend++;
          } else {
            weekday++;
          }
        });
      }

      if (weekend > weekday) {
        setCorrelationDescriptions((PrevDescriptions) => [
          ...PrevDescriptions,
          `You usually break your ${addiction.habitName} on the weekend`,
        ]);
      } else if (weekend === 0 && weekday === 0) {
        return null;
      } else {
        setCorrelationDescriptions((PrevDescriptions) => [
          ...PrevDescriptions,
          `You usually break your ${addiction.habitName} on weekdays`,
        ]);
      }
    });
  }
  useEffect(() => {
    analyzeMoodCorrelation();
    CheckAddictionBreak();
  }, [Items]);
  function CalculateAverageHappiness() {
    let totalHappiness = 0;
    let totalValuesCount = 0;

    if (moodItem && moodItem.data) {
      const itemTotal = moodItem.data.reduce(
        (acc, curr) => acc + curr.value,
        0,
      );
      totalHappiness += itemTotal;
      totalValuesCount += moodItem.data.length;
    }

    const averageHappiness =
      totalValuesCount > 0 ? totalHappiness / totalValuesCount : 0;
    return averageHappiness;
  }

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

  const overallHappiness = CalculateAverageHappiness();
  const mostFrequentMoods = mostOftenHumor();
  return (
    <div>
      <ProfileSummary overallHappiness={overallHappiness} />
      <ProfileStats
        overallHappiness={overallHappiness}
        daysDone={daysDone}
        mostFrequentMoods={mostFrequentMoods}
        correlationDescriptions={correlationDescriptions}
      />
    </div>
  );
}
export default ProfileStatsContainer;
