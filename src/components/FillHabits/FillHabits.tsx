import { Link } from 'react-router-dom';
import HappyIcon from '../../static/Happy.svg';
import SadIcon from '../../static/Sad.svg';
import AngryIcon from '../../static/Angry.svg';
import CalmIcon from '../../static/Calm.svg';
import classes from './FillHabits.module.css';
import { Button } from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import { HabitAddictionItem } from '@/src/types/types';

interface FillHabitsProps {
  OnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  OnNextItem: () => void;
  selectedMood: string;
  OnMoodChange: (mood: string) => void;
  isMoodStep: boolean;
  date: Date | undefined;
  habits: HabitAddictionItem[];
  currentIndex: number;
  values: number[];
  moodValue: number | string;
}
function FillHabits({
  OnChange,
  OnNextItem,
  selectedMood,
  OnMoodChange,
  date,
  isMoodStep,
  habits,
  currentIndex,
  values,
  moodValue,
}: FillHabitsProps) {
  return (
    <div>
      <p>Selected Date: {date?.toLocaleDateString()}</p>
      {!isMoodStep ? (
        <div className={classes.fillBox}>
          <h2>Fill Data for {habits[currentIndex].habitName}</h2>
          <Input
            type="number"
            value={values[currentIndex]}
            onChange={OnChange}
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
              onClick={() => OnMoodChange(`happy`)}
            />
            <img
              className={`${classes.MoodImg} ${selectedMood === `sad` && classes.selectedMood}`}
              src={SadIcon}
              onClick={() => OnMoodChange(`sad`)}
            />
            <img
              className={`${classes.MoodImg} ${selectedMood === `angry` && classes.selectedMood}`}
              src={AngryIcon}
              onClick={() => OnMoodChange(`angry`)}
            />
            <img
              className={`${classes.MoodImg} ${selectedMood === `calm` && classes.selectedMood}`}
              src={CalmIcon}
              onClick={() => OnMoodChange(`calm`)}
            />
          </div>
          <Input
            type="number"
            value={moodValue}
            onChange={OnChange}
            placeholder="Enter your Mood value"
            min={1}
            max={10}
          />
        </div>
      )}
      {isMoodStep ? (
        <Link to="/summary">
          <Button onClick={OnNextItem}>Finish</Button>
        </Link>
      ) : (
        <Button onClick={OnNextItem}>
          {currentIndex < habits.length - 1 ? `Next` : `Next (Mood)`}
        </Button>
      )}
    </div>
  );
}

export default FillHabits;
