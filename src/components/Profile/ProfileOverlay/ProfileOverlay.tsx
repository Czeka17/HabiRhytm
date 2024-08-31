import ProfileStatsContainer from '../../../containers/ProfileStatsContainer/ProfileStatsContainer';
import ProfileImage from '../ProfileImage/ProfileImage';
import classes from './ProfileOverlay.module.css';

function ProfileOverlay() {
  return (
    <div className={classes.container}>
      <ProfileImage />
      <ProfileStatsContainer />
    </div>
  );
}
export default ProfileOverlay;
