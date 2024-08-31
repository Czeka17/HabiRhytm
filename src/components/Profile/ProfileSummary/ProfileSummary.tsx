import { useEffect, useState } from 'react';

interface ProfileSummaryProps {
  overallHappiness: number;
}
function ProfileSummary({ overallHappiness }: ProfileSummaryProps) {
  const [happiness, setHappiness] = useState(``);
  useEffect(() => {
    if (overallHappiness >= 4 && overallHappiness < 7) {
      setHappiness(`You are ok`);
    } else if (overallHappiness >= 7) {
      setHappiness(`You are a happy person!`);
    } else {
      setHappiness(`Ouch.. you need to change something...`);
    }
  }, [overallHappiness]);

  return (
    <div>
      <p>{happiness}</p>
    </div>
  );
}
export default ProfileSummary;
