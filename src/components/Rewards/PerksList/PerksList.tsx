import List from '../../../UI/List/List';
import PerkItem from '../PerkItem/PerkItem';

const DUMMY_PERKS = [
  {
    PerkType: `Background`,
    color: `#2f2f2f`,
    UnlockedAt: 1,
  },
  {
    PerkType: `Background`,
    color: `#123123`,
    UnlockedAt: 1,
  },
  {
    PerkType: `Background`,
    color: `#AAAAAA`,
    UnlockedAt: 2,
  },
  {
    PerkType: `Background`,
    color: `#111222`,
    UnlockedAt: 3,
  },
  {
    PerkType: `Background`,
    color: `#474747`,
    UnlockedAt: 4,
  },
  {
    PerkType: `Accent`,
    color: `#3d3d3d`,
    UnlockedAt: 1,
  },
  {
    PerkType: `Accent`,
    color: `#60A561`,
    UnlockedAt: 2,
  },
  {
    PerkType: `Accent`,
    color: `#0B4F6C`,
    UnlockedAt: 3,
  },
  {
    PerkType: `Accent`,
    color: `#60A561`,
    UnlockedAt: 4,
  },
  {
    PerkType: `Color`,
    color: `#FFFFFF`,
    UnlockedAt: 1,
  },
  {
    PerkType: `Color`,
    color: `#111472`,
    UnlockedAt: 2,
  },
  {
    PerkType: `Color`,
    color: `#000000`,
    UnlockedAt: 3,
  },
  {
    PerkType: `Font`,
    color: `Rubik`,
    UnlockedAt: 4,
  },
  {
    PerkType: `Font`,
    color: `Playwrite CU`,
    UnlockedAt: 5,
  },
  {
    PerkType: `Font`,
    color: `Nerko One`,
    UnlockedAt: 6,
  },
  {
    PerkType: `Font`,
    color: `Sevillana`,
    UnlockedAt: 7,
  },
];
function PerksList() {
  return (
    <div>
      <p>Backgrounds</p>
      <List isAddictionList={true}>
        {DUMMY_PERKS.filter((item) => item.PerkType === `Background`).map(
          (perk, index) => (
            <PerkItem key={index} perk={perk} />
          ),
        )}
      </List>
      <p>Font Colors</p>
      <List isAddictionList={true}>
        {DUMMY_PERKS.filter((item) => item.PerkType === `Color`).map(
          (perk, index) => (
            <PerkItem key={index} perk={perk} />
          ),
        )}
      </List>
      <p>Accent Colors</p>
      <List isAddictionList={true}>
        {DUMMY_PERKS.filter((item) => item.PerkType === `Accent`).map(
          (perk, index) => (
            <PerkItem key={index} perk={perk} />
          ),
        )}
      </List>
      <p>Fonts</p>
      <List isAddictionList={true}>
        {DUMMY_PERKS.filter((item) => item.PerkType === `Font`).map(
          (perk, index) => (
            <PerkItem key={index} perk={perk} />
          ),
        )}
      </List>
    </div>
  );
}
export default PerksList;
