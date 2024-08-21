import React from 'react';
import { useStore } from '../../../store/HabitsStore';
import { getTimeDifference } from '../../../lib/lib';
import classes from './RoutineItem.module.css'
interface HabitItemProps {
    habit: { id: number, habitName: string, HabitType: string, time?:Date,Unit?:string, goal?:{min:number,max:number},data?: { date: string, value: number,mood?:string }[]; };
}

function RoutineItem({ habit }: HabitItemProps) {
    const { ToggleModal, DeleteHabitHandler, ResetAddictionTimer,SelectItem } = useStore(state => ({
        ToggleModal: state.ToggleModal,
        DeleteHabitHandler:state.DeleteItemHandler,
        ResetAddictionTimer:state.ResetAddictionTimer,
        SelectItem:state.SelectItem
    }));

    const handleEditClick = () => {
        SelectItem(habit.id)
        
        ToggleModal();
    };
    

    const timeDifference = habit.time ? getTimeDifference(habit.time) : null;
    

    return (
        <li className={`${classes.Item} ${habit.time && classes.addiction}`}>
            <p>{habit.habitName}</p>
            {timeDifference && <p>{timeDifference}</p>}
            {habit.goal && <p>min:{habit.goal.min}</p>}
           <div>
            {habit.HabitType === 'Addiction' && <button onClick={() => ResetAddictionTimer(habit.id)}>Reset</button>}
           <button onClick={() => handleEditClick()}>Edit</button>
           <button onClick={() => DeleteHabitHandler(habit.id)}>Delete</button>
           </div>
        </li>
    );
}

export default RoutineItem;
