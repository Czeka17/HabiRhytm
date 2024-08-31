import classes from './ProfileImage.module.css';
function ProfileImage() {
  return (
    <div>
      <div className={classes.ProfilePic}>
        <img src="https://image.ceneostatic.pl/data/article_picture/3b/57/7fdb-9928-4029-a5f4-6b1556cb59d1_large.jpg" />
      </div>
    </div>
  );
}
export default ProfileImage;
