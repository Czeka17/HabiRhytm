import AiGeneratedChart from "../AiGeneratedChart/AiGeneratedChart";
import HabitSummaryItem from "../HabitSummaryItem/HabitSummaryItem";
import classes from './HabitSummaryList.module.css'
interface Habit {
    id: number;
    habitName: string;
    HabitType: string;
    time?: Date;
	Unit?:string;
    goal?: {
        min: number;
        max: number;
    };
	data?: { date: string, value: number,mood?:string }[];
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
						<AiGeneratedChart/>
				</ul>
			</div>
		</div>
	);
}
export default HabitSummaryList;
