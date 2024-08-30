import FillHabits from '../../components/FillHabits/FillHabits';
import { useStore } from '../../context/HabitsContext';
import { useState } from 'react';
import CalendarWeek from '../../UI/Calendar/Calendar';

function FillHabitsContainer() {
  const { Items, handleUpdateHabitData, handleEditHabitData } = useStore();
  const habits = Items.filter((habit) => habit.HabitType === `Habit`);

  const mood = Items.find((item) => item.HabitType === `Mood`);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [values, setValues] = useState<number[]>(
    new Array(habits.length).fill(``),
  );
  const [moodValue, setMoodValue] = useState<number | ``>(``);
  const [isMoodStep, setIsMoodStep] = useState(false);
  const [selectedMood, setSelectedMood] = useState(``);

  const handleMoodChange = (mood: string) => {
    setSelectedMood(mood);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isMoodStep) {
      setMoodValue(Number(event.target.value));
    } else {
      const updatedValues = [...values];
      updatedValues[currentIndex] = Number(event.target.value);
      setValues(updatedValues);
    }
  };

  const handleNext = () => {
    const selectedDate = date!.toLocaleDateString(`pl-PL`, {
      day: `2-digit`,
      month: `2-digit`,
    });

    const habit = habits[currentIndex];
    const habitItem = Items.find((item) => item.id === habit.id);

    if (!habitItem) {
      return;
    }

    const existingData = habitItem.data?.find(
      (dataItem) => dataItem.date === selectedDate,
    );

    const existingMoodData = mood?.data?.find(
      (moodItem) => moodItem.date === selectedDate,
    );

    const updateData = {
      date: selectedDate,
      value: values[currentIndex],
    };

    if (isMoodStep) {
      console.log(`mood`);
      if (mood && selectedMood !== ``) {
        const moodData = {
          date: selectedDate,
          value: moodValue as number,
          mood: selectedMood,
        };

        if (existingMoodData) {
          handleEditHabitData(mood.id, moodData);
          console.log(`edit`);
        } else {
          handleUpdateHabitData(mood.id, moodData);
          console.log(`update`);
        }
        setIsMoodStep(false);
      }
    } else {
      if (currentIndex === habits.length - 1) {
        if (existingData) {
          handleEditHabitData(habit.id, updateData);
        } else {
          handleUpdateHabitData(habit.id, updateData);
        }
        setIsMoodStep(true);
      } else {
        if (existingData) {
          handleEditHabitData(habit.id, updateData);
        } else {
          handleUpdateHabitData(habit.id, updateData);
        }
        setCurrentIndex(currentIndex + 1);
      }
    }
  };
  return (
    <>
      <CalendarWeek selectedDate={date} onSelectDate={setDate} />
      <FillHabits
        OnChange={handleChange}
        OnNextItem={handleNext}
        selectedMood={selectedMood}
        OnMoodChange={handleMoodChange}
        date={date}
        isMoodStep={isMoodStep}
        habits={habits}
        currentIndex={currentIndex}
        values={values}
        moodValue={moodValue}
      />
    </>
  );
}
export default FillHabitsContainer;
