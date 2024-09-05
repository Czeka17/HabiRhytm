interface GardenItemsToSeedProps {
  OnSeedSelect: (seed: { name: string; time: number }) => void;
}
const GARDEN_ITEMS = [
  {
    name: `Carrot`,
    time: 0.3 * 60 * 1000,
  },
  {
    name: `Potato`,
    time: 10 * 60 * 1000,
  },
  {
    name: `Tomato`,
    time: 15 * 60 * 1000,
  },
  {
    name: `Watermelon`,
    time: 20 * 60 * 1000,
  },
];

function GardenItemsToSeed({ OnSeedSelect }: GardenItemsToSeedProps) {
  return (
    <div>
      <ul>
        {GARDEN_ITEMS.map((item, index) => (
          <li key={index} onClick={() => OnSeedSelect(item)}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default GardenItemsToSeed;
