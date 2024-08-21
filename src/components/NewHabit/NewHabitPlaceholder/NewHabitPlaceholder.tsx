import { useStore } from '../../../store/HabitsStore';
import classes from '../../Habits/RoutineItem/RoutineItem.module.css'
function NewHabitPlaceholder(){
    const {ToggleModal} = useStore(state => ({
        ToggleModal:state.ToggleModal
    }));
    
    return <li className={classes.Item}><p>Add Habit</p><button onClick={ToggleModal}>Add</button></li>
}
export default NewHabitPlaceholder;