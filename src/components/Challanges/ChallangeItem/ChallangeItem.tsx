interface ChallangeItemProps{
    challange: {
		id: number;
		habitName: string;
		HabitType: string;
		time?: Date;
		Unit?: string;
		goal?: { min?: number; max?: number };
		data?: { date: string; value: number; mood?: string }[];
	};
}
function ChallangeItem({challange}:ChallangeItemProps){
    return <li>
        <p>{challange.habitName}</p>
        <p>{challange.HabitType}</p>
        {challange?.goal?.min && <p>min:{challange.goal.min} {challange.Unit}</p>}
    </li>
}
export default ChallangeItem;