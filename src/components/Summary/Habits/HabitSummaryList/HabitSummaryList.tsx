import HabitSummaryItem from "../HabitSummaryItem/HabitSummaryItem";
import classes from './HabitSummaryList.module.css'
interface Habit {
    id: number;
    habitName: string;
    HabitType: string;
    time?: Date;
    goal?: {
        min: number;
        max: number;
    };
	data?: { date: string, value: number }[];
}
interface HabitSummaryListProps{
	items:Habit[]
}
function HabitSummaryList({items}:HabitSummaryListProps) {

	const Mood = items.find((item) => item.HabitType === 'Mood')
	return (
		<div>
			<div>
				<ul className={classes.HabitSummaryList}>
					<HabitSummaryItem item={Mood!} />
					{items.filter((item) => item.HabitType === 'Habit')
						.map((habit, index) => (
							<HabitSummaryItem item={habit}/>
						))}
				</ul>
			</div>
		</div>
	);
}
export default HabitSummaryList;
