import { Link } from 'react-router-dom';
import { useStore } from '../../context/HabitsContext';
import { useEffect, useState } from 'react';
import HappyIcon from '../../static/Happy.svg';
import SadIcon from '../../static/Sad.svg';
import AngryIcon from '../../static/Angry.svg';
import CalmIcon from '../../static/Calm.svg';
import classes from './FillHabits.module.css';
import { Button } from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Calendar from '../../UI/Calendar/Calendar';

function FillHabits() {
  const { Items, UpdateHabitData, EditHabitData } = useStore();
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

  useEffect(() => {
    console.log(date);
  }, [date]);

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

    const updateData = {
      date: selectedDate,
      value: values[currentIndex],
    };

    if (isMoodStep) {
      if (mood && selectedMood !== ``) {
        const moodData = {
          date: selectedDate,
          value: moodValue as number,
          mood: selectedMood,
        };

        if (existingData) {
          EditHabitData(mood.id, moodData);
        } else {
          UpdateHabitData(mood.id, moodData);
        }
        setIsMoodStep(false);
      }
    } else {
      if (currentIndex === habits.length - 1) {
        if (existingData) {
          EditHabitData(habit.id, updateData);
        } else {
          UpdateHabitData(habit.id, updateData);
        }
        setIsMoodStep(true);
      } else {
        if (existingData) {
          EditHabitData(habit.id, updateData);
        } else {
          UpdateHabitData(habit.id, updateData);
        }
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      <p>Selected Date: {date?.toLocaleDateString()}</p>
      {!isMoodStep ? (
        <div className={classes.fillBox}>
          <h2>Fill Data for {habits[currentIndex].habitName}</h2>
          <Input
            type="number"
            value={values[currentIndex]}
            onChange={handleChange}
            placeholder={`Enter value for ${habits[currentIndex].habitName}`}
          />
        </div>
      ) : (
        <div className={classes.MoodSelectionBox}>
          <h2>Fill Data for Mood</h2>
          <div>
            <img
              className={`${classes.MoodImg} ${selectedMood === `happy` && classes.selectedMood}`}
              src={HappyIcon}
              onClick={() => setSelectedMood(`happy`)}
            />
            <img
              className={`${classes.MoodImg} ${selectedMood === `sad` && classes.selectedMood}`}
              src={SadIcon}
              onClick={() => setSelectedMood(`sad`)}
            />
            <img
              className={`${classes.MoodImg} ${selectedMood === `angry` && classes.selectedMood}`}
              src={AngryIcon}
              onClick={() => setSelectedMood(`angry`)}
            />
            <img
              className={`${classes.MoodImg} ${selectedMood === `calm` && classes.selectedMood}`}
              src={CalmIcon}
              onClick={() => setSelectedMood(`calm`)}
            />
          </div>
          <Input
            type="number"
            value={moodValue}
            onChange={handleChange}
            placeholder="Enter your Mood value"
          />
        </div>
      )}
      {isMoodStep ? (
        <Link to="/summary">
          <Button onClick={handleNext}>Finish</Button>
        </Link>
      ) : (
        <Button onClick={handleNext}>
          {currentIndex < habits.length - 1 ? `Next` : `Next (Mood)`}
        </Button>
      )}
    </div>
  );
}

export default FillHabits;
