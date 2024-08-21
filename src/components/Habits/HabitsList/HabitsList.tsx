import { useStore } from "../../../store/HabitsStore";
import RoutineItem from "../RoutineItem/RoutineItem";
import NewHabitPlaceholder from "../../NewHabit/NewHabitPlaceholder/NewHabitPlaceholder";
import { Link } from "react-router-dom";
import Button from "../../../UI/Button/Button";
import List from "../../../UI/List/List";
import HabitModalContainer from "../../../containers/HabitModalContainer/HabitModalContainer";
function HabitsGrid() {
	const { habits } = useStore((state) => ({
		habits: state.Items,
	}));

	return (
		<div>
			<h2>Your habits</h2>
			<List isAddictionList={true}>{habits.filter((habit) => habit.HabitType === 'Addiction').map((habit, index) => (
						<RoutineItem
							habit={habit}
							key={index}
						/>
					))}</List>
					<List>
					{habits.filter((habit) => habit.HabitType === 'Habit').map((habit, index) => (
						<RoutineItem
							habit={habit}
							key={index}
						/>
					))}
                    <NewHabitPlaceholder/>
					</List>
				
            <Link to='/fill'><Button name={"fill your tasks"}/></Link>
			<HabitModalContainer />
		</div>
	);
}
export default HabitsGrid;
