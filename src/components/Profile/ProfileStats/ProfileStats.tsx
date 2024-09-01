interface ProfileStatsProps {
  overallHappiness: number;
  daysDone: number | undefined;
  mostFrequentMoods: string | string[];
  correlationDescriptions: string[];
}
function ProfileStats({
  overallHappiness,
  daysDone,
  mostFrequentMoods,
  correlationDescriptions,
}: ProfileStatsProps) {
  return (
    <div>
      <p>Overall happiness: {overallHappiness.toFixed(1)}</p>
      <p>completed Days: {daysDone}</p>
      <p>most frequent mood:{mostFrequentMoods}</p>
      <p>completed challanges: 0</p>
      {correlationDescriptions.map((description, index) => (
        <p key={index}>{description}</p>
      ))}
    </div>
  );
}
export default ProfileStats;
