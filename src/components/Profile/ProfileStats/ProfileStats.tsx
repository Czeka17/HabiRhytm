import calmIcon from '../../../static/Calm.svg';
import happyIcon from '../../../static/Happy.svg';
import sadIcon from '../../../static/Sad.svg';
import starIcon from '../../../static/star.svg';
import trophyIcon from '../../../static/trophy.svg';
import statsIcon from '../../../static/stats.svg';
interface ProfileStatsProps {
  overallHappiness: number;
  daysDone: number | undefined;
  mostFrequentMoods: string | string[];
  correlationDescriptions: string[];
  completedChallanges: number;
}
function ProfileStats({
  overallHappiness,
  daysDone,
  mostFrequentMoods,
  correlationDescriptions,
  completedChallanges,
}: ProfileStatsProps) {
  return (
    <div>
      <div
        className="p-2 my-2 rounded-xl"
        style={{ backgroundColor: `var(--accent-color)` }}
      >
        <div className="flex items-center justify-center">
          {+overallHappiness.toFixed(1) <= 3.99 && <img src={sadIcon} />}
          {+overallHappiness.toFixed(1) >= 4 &&
            +overallHappiness.toFixed(1) < 7 && <img src={calmIcon} />}
          {+overallHappiness.toFixed(1) >= 7 && <img src={happyIcon} />}
          <p>Overall happiness: {overallHappiness.toFixed(1)}</p>
        </div>
        <div className="flex items-center justify-center">
          <img src={starIcon} />
          <p>completed Days: {daysDone}</p>
        </div>
        <div className="flex items-center justify-center">
          <img src={statsIcon} />
          <p>most frequent mood:{mostFrequentMoods}</p>
        </div>
        <div className="flex items-center justify-center">
          <img src={trophyIcon} />
          <p>completed challanges: {completedChallanges}</p>
        </div>
      </div>
      {correlationDescriptions.map((description, index) => (
        <p key={index}>{description}</p>
      ))}
    </div>
  );
}
export default ProfileStats;
