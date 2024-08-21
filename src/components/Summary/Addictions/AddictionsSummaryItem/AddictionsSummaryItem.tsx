import { getTimeDifference } from '../../../../lib/lib';
import classes from './AddictionsSummaryItem.module.css'

interface AddictionsSummaryItemProps{
    item: { id: number, habitName: string, HabitType: string, time?:Date, goal?:{min:number,max:number} };
}
function AddictionsSummaryItem({item}:AddictionsSummaryItemProps){
    const timeDifference = item.time ? getTimeDifference(item.time) : null;
    return <li className={classes.item}>
       <p>{item.habitName}</p>
       {timeDifference && <p>{timeDifference}</p>}
    </li>
}
export default AddictionsSummaryItem;