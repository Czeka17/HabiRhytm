import { useEffect, useState } from 'react';
import GardenItemsToSeed from './GardenItemsToSeed';

interface GardenField {
  id: number;
  name?: string;
  time?: number;
  plantedAt?: number;
  isReady?: boolean;
}
function Garden() {
  const [fields, setFields] = useState<GardenField[]>(
    Array.from({ length: 20 }, (_, index) => ({ id: index + 1 })),
  );
  const [selectedItemToSeed, setSelectedItemToSeed] = useState<{
    name: string;
    time: number;
  }>({ name: ``, time: 0 });
  const [crops, setCrops] = useState<{
    carrots: number;
    tomatoes: number;
    potatoes: number;
  }>({
    carrots: 5,
    tomatoes: 0,
    potatoes: 0,
  });

  function SelectItemToSeedHandler(seed: { name: string; time: number }) {
    setSelectedItemToSeed(seed);
  }
  function SeedField(id: number) {
    if (selectedItemToSeed.name !== `` && crops.carrots > 0) {
      setFields((prevFields) =>
        prevFields.map((field) =>
          field.id === id
            ? {
                ...field,
                name: selectedItemToSeed.name,
                time: selectedItemToSeed.time,
                plantedAt: Date.now(),
              }
            : field,
        ),
      );
      setCrops((prevCrops) => ({
        ...prevCrops,
        carrots: prevCrops.carrots - 1,
      }));
    }
  }

  function handleHarvestField(id: number) {
    setFields((prevFields) =>
      prevFields.map((field) => {
        if (field.id === id && field.isReady === true) {
          setCrops((prevCrops) => ({
            ...prevCrops,
            carrots: prevCrops.carrots + 2,
          }));
          return {
            ...field,
            plantedAt: undefined,
            name: ``,
            time: 0,
            isReady: false,
          };
        }
        return field;
      }),
    );
  }

  function getTimeRemaining(plantedAt: number, time: number) {
    const timeLeft = plantedAt + time - Date.now();
    if (timeLeft <= 0) return `Ready now!`;

    const minutes = Math.floor(timeLeft / (60 * 1000));
    const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);
    return `Ready in: ${minutes}m ${seconds}s`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setFields((prevFields) =>
        prevFields.map((field) =>
          field.plantedAt && Date.now() >= field.plantedAt + (field.time || 0)
            ? {
                ...field,
                isReady: true,
              }
            : field,
        ),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-5 gap-4 max-w-[1200px] mx-auto">
      {fields.map((field) => (
        <div key={field.id} className="border p-4 rounded">
          <h3>Field {field.id}</h3>
          <p>Name: {field.name || `None`}</p>
          {field.plantedAt && (
            <p>
              Status:{` `}
              {field.plantedAt
                ? getTimeRemaining(field.plantedAt, field.time!)
                : `Not planted`}
            </p>
          )}
          <button onClick={() => SeedField(field.id)}>Seed</button>
          <button onClick={() => handleHarvestField(field.id)}>Harvest</button>
        </div>
      ))}
      <p>{crops.carrots}</p>
      <GardenItemsToSeed OnSeedSelect={SelectItemToSeedHandler} />
    </div>
  );
}
export default Garden;
