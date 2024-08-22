import { Link } from "react-router-dom";
import { useStore } from "../../store/HabitsStore";
import { useState } from "react";
import HappyIcon from '../../static/Happy.svg'
import SadIcon from '../../static/Sad.svg'
import AngryIcon from '../../static/Angry.svg'
import CalmIcon from '../../static/Calm.svg'
import classes from './FillHabits.module.css'
import Button from "../../UI/Button/Button";
function FillHabits(){
    
    const { items, updateHabitData } = useStore((state) => ({
        items: state.Items,
        updateHabitData: state.UpdateHabitData
    }));
    const habits = items.filter((habit) => habit.HabitType === 'Habit')

    const mood = items.find((item) => item.HabitType === 'Mood')

    const [currentIndex, setCurrentIndex] = useState(0);
    const [values, setValues] = useState<number[]>(new Array(habits.length).fill(''));
    const [moodValue, setMoodValue] = useState<number | ''>('');
    const [isMoodStep, setIsMoodStep] = useState(false); 
    const [selectedMood,setSelectedMood] = useState('')

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
        if (isMoodStep) {
            const today = new Date().toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' });
            if (mood && selectedMood !== '') {
                updateHabitData(mood.id, { date: today, value: moodValue as number, mood:selectedMood });
            }
        } else if (currentIndex < habits.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            const today = new Date().toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' });

            habits.forEach((habit, index) => {
                updateHabitData(habit.id, { date: today, value: values[index] });
            });
            setIsMoodStep(true);
        }
    };


    return (
        <div>
        {!isMoodStep ? (
            <div className={classes.fillBox}>
                <h2>Fill Data for {habits[currentIndex].habitName}</h2>
                <input
                className={classes.input}
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
               <img className={`${classes.MoodImg} ${selectedMood === 'happy' && classes.selectedMood}`} src={HappyIcon} onClick={() => setSelectedMood('happy')}/>
                <img className={`${classes.MoodImg} ${selectedMood === 'sad' && classes.selectedMood}`} src={SadIcon} onClick={() => setSelectedMood('sad')}/>
                <img className={`${classes.MoodImg} ${selectedMood === 'angry' && classes.selectedMood}`} src={AngryIcon} onClick={() => setSelectedMood('angry')}/>
                <img className={`${classes.MoodImg} ${selectedMood === 'calm' && classes.selectedMood}`} src={CalmIcon} onClick={() => setSelectedMood('calm')}/>
               </div>
                <input
                    type="number"
                    value={moodValue}
                    onChange={handleChange}
                    placeholder="Enter your Mood value"
                />
            </div>
        )}
        {isMoodStep ? (
            <Link to='/summary'>
                <Button onClick={handleNext} name="Finish" />
            </Link>
        ) : (
           
            <Button onClick={handleNext} name={currentIndex < habits.length - 1 ? 'Next' : 'Next (Mood)'}/>
        )}
    </div>
    );
}

export default FillHabits;
