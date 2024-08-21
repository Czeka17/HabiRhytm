import RewardItem from "../RewardItem/RewardItem";
import classes from './RewardsList.module.css'
const DUMMY_REWARDS = [
    {
        name:'Keep your streak for a week',
    },
    {
        name:'Keep your streak for a month',
    },
    {
        name:'Keep your streak for a year',
    },
    {
        name:'Keep your streak for a year',
    },
    {
        name:'Keep your streak for a year',
    },
    {
        name:'Keep your streak for a year',
    },
    {
        name:'Keep your streak for a year',
    },
]
function RewardsList(){
    return <div>
        <ul className={classes.RewardList}>
            {DUMMY_REWARDS.map((reward,index) => (
                <RewardItem key={index} reward={reward} />
            ))}
        </ul>
    </div>
}
export default RewardsList;