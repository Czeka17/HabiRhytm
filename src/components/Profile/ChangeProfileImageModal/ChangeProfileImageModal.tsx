import { useExperience } from '../../../context/ExperienceContext';
import List from '../../../UI/List/List';

const DUMMY_IMAGES = [
  {
    URL: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT676QvN9QnFzMW1GN2GgI7ZKyZBlTubmQqvg&s`,
    UnlockedAt: 1,
  },
  {
    URL: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqfRAHHAsp98NzBiBzKN28eCiTaPBCmuF0kA&s`,
    UnlockedAt: 2,
  },
  {
    URL: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV6-DQF2pBwNFV9KzPafu9RghrNF1tZ8J3AA&s`,
    UnlockedAt: 3,
  },
  {
    URL: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGwVd07rcBUxKVqf17F_Li5fy-a_zni7JuEQ&s`,
    UnlockedAt: 4,
  },
  {
    URL: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHCyfogwVsgQpPvWIXeEXDgya5JEvOmnVqaQ&s`,
    UnlockedAt: 5,
  },
  {
    URL: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT676QvN9QnFzMW1GN2GgI7ZKyZBlTubmQqvg&s`,
    UnlockedAt: 6,
  },
  {
    URL: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTWYenGebfzJCuwiR4WdjzTzI7BdavwbbeHA&s`,
    UnlockedAt: 7,
  },
  {
    URL: `https://image.ceneostatic.pl/data/article_picture/3b/57/7fdb-9928-4029-a5f4-6b1556cb59d1_large.jpg`,
    UnlockedAt: 8,
  },
];

interface ChangeProfileImageModalProps {
  OnHideModal: () => void;
  OnChangeProfileImage: (url: string) => void;
}

function ChangeProfileImageModal({
  OnHideModal,
  OnChangeProfileImage,
}: ChangeProfileImageModalProps) {
  const { level } = useExperience();
  return (
    <div
      className="absolute w-[100%] h-[100%] left-[0%] top-[0%] flex items-center justify-center bg-black"
      onClick={OnHideModal}
    >
      <div style={{ backgroundColor: `var(--accent-color)` }}>
        <List isAddictionList={true}>
          {DUMMY_IMAGES.map((image, index) =>
            level >= image.UnlockedAt ? (
              <img
                key={index}
                className="w-[100px] h-[100px] rounded-full object-cover"
                src={image.URL}
                onClick={() => OnChangeProfileImage(image.URL)}
              />
            ) : (
              <div
                key={index}
                className="w-[100px] h-[100px] rounded-full bg-slate-200 flex items-center"
              >
                <p>Unlocked at: {image.UnlockedAt}</p>
              </div>
            ),
          )}
        </List>
      </div>
    </div>
  );
}
export default ChangeProfileImageModal;
