import React from "react";
import { useStore } from "../../../store/HabitsStore";
import { getTimeDifference } from "../../../lib/lib";
import editSVG from '../../../static/edit.svg'
import deleteSVG from '../../../static/delete.svg'
import resetSVG from '../../../static/reset.svg'
import classes from "./RoutineItem.module.css";
interface HabitItemProps {
	habit: {
		id: number;
		habitName: string;
		HabitType: string;
		time?: Date;
		Unit?: string;
		goal?: { min: number; max: number };
		data?: { date: string; value: number; mood?: string }[];
	};
}

function RoutineItem({ habit }: HabitItemProps) {
	const { ToggleModal, DeleteHabitHandler, ResetAddictionTimer, SelectItem } =
		useStore((state) => ({
			ToggleModal: state.ToggleModal,
			DeleteHabitHandler: state.DeleteItemHandler,
			ResetAddictionTimer: state.ResetAddictionTimer,
			SelectItem: state.SelectItem,
		}));

	const handleEditClick = () => {
		SelectItem(habit.id);

		ToggleModal();
	};

	const timeDifference = habit.time ? getTimeDifference(habit.time) : null;

	return (
		<li className={`${classes.Item} ${habit.time && classes.addiction}`}>
			<p>{habit.habitName}</p>
			{timeDifference && <p>{timeDifference}</p>}

			<div>
				{habit.HabitType === "Addiction" && (
					<button className={classes.button} onClick={() => ResetAddictionTimer(habit.id)}><img src={resetSVG} /></button>
				)}
				<button className={classes.button} onClick={() => handleEditClick()}><img src={editSVG} /></button>
				<button className={classes.button} onClick={() => DeleteHabitHandler(habit.id)}><img src={deleteSVG} /></button>
			</div>
		</li>
	);
}

export default RoutineItem;
