import svg from '../../../static/reward.svg'
import classes from './RewardItem.module.css'
interface RewardItemProps{
    reward:{name:string}
}
function RewardItem({reward}:RewardItemProps){
    return <li><img className={classes.RewardItemSVG} src={svg}/><p>{reward.name}</p></li>
}
export default RewardItem;