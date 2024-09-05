import { useState } from 'react';
import ChangeProfileImageModal from '../ChangeProfileImageModal/ChangeProfileImageModal';
import classes from './ProfileImage.module.css';

interface ProfileImageProps {
  profileImage: string;
  OnChangeProfileImage: (url: string) => void;
}
function ProfileImage({
  profileImage,
  OnChangeProfileImage,
}: ProfileImageProps) {
  const [ModalIsOpen, setModalIsOpen] = useState(false);
  function hideModal() {
    setModalIsOpen(false);
  }
  return (
    <div>
      <div className={classes.ProfilePic} onClick={() => setModalIsOpen(true)}>
        <img src={profileImage} />
      </div>
      {ModalIsOpen && (
        <ChangeProfileImageModal
          OnHideModal={hideModal}
          OnChangeProfileImage={OnChangeProfileImage}
        />
      )}
    </div>
  );
}
export default ProfileImage;
