import List from '../../../UI/List/List';
import PerkItem from '../PerkItem/PerkItem';

const DUMMY_PERKS = [
  {
    PerkType: `Background`,
    color: `#123123`,
  },
  {
    PerkType: `Background`,
    color: `#AAAAAA`,
  },
  {
    PerkType: `Background`,
    color: `#111222`,
  },
  {
    PerkType: `Background`,
    color: `#474747`,
  },
  {
    PerkType: `Color`,
    color: `#111472`,
  },
  {
    PerkType: `Color`,
    color: `#FFFFFF`,
  },
  {
    PerkType: `Color`,
    color: `#000000`,
  },
  {
    PerkType: `Font`,
    color: `Rubik`,
  },
  {
    PerkType: `Font`,
    color: `Playwrite CU`,
  },
  {
    PerkType: `Font`,
    color: `Nerko One`,
  },
  {
    PerkType: `Font`,
    color: `Sevillana`,
  },
];
function PerksList() {
  return (
    <div>
      <List isAddictionList={true}>
        {DUMMY_PERKS.map((perk, index) => (
          <PerkItem key={index} perk={perk} />
        ))}
      </List>
    </div>
  );
}
export default PerksList;
