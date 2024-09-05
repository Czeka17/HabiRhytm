import { useState } from 'react';
import ProfileStatsContainer from '../../../containers/ProfileStatsContainer/ProfileStatsContainer';
import ProfileImage from '../ProfileImage/ProfileImage';
import classes from './ProfileOverlay.module.css';

function ProfileOverlay() {
  const [profileImage, setProfileImage] = useState(
    `https://image.ceneostatic.pl/data/article_picture/3b/57/7fdb-9928-4029-a5f4-6b1556cb59d1_large.jpg`,
  );

  function ChangeProfileImageHandler(url: string) {
    setProfileImage(url);
  }
  return (
    <div className={classes.container}>
      <ProfileImage
        OnChangeProfileImage={ChangeProfileImageHandler}
        profileImage={profileImage}
      />
      <ProfileStatsContainer />
    </div>
  );
}
export default ProfileOverlay;
