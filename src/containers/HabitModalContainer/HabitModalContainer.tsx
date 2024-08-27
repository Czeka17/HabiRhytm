import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../../context/HabitsContext';
import { Button } from '../../UI/Button/Button';
import HabitModal from '../../components/HabitModal/HabitModal';
import { HabitAddictionItem } from '../../types/types';
interface HabitModalContainerProps {
  OnClose: () => void;
  IsOpen: boolean;
  SelectedItemId: HabitAddictionItem | null;
  OnSelect: (id: number | null) => void;
}

type Transaction =
  | { is: `selection` }
  | { is: `name` }
  | { is: `minmax` }
  | { is: `date` }
  | { is: `editing` };

const units = [
  `hours`,
  `minutes`,
  `kcal`,
  `repeats`,
  `kilometers`,
  `meters`,
  `steps`,
  `liters`,
  `percents`,
  `celsius`,
  `fahrenheits`,
  `happiness`,
];

function HabitModalContainer({
  IsOpen,
  OnClose,
  SelectedItemId,
  OnSelect,
}: HabitModalContainerProps) {
  const { EditItemHandler, AddItemHandler } = useStore();
  const [state, setState] = useState({ is: `selection` } as Transaction);
  const [habitName, setHabitName] = useState<string>(
    SelectedItemId?.habitName || ``,
  );
  const [isHabit, setIsHabit] = useState(true);
  const [unit, setUnit] = useState(`hours`);
  const [minValue, setMinValue] = useState<number>(
    SelectedItemId?.goal?.min || 0,
  );
  const [maxValue, setMaxValue] = useState<number>(
    SelectedItemId?.goal?.max || 0,
  );
  const EditHabitInputRef = useRef<HTMLInputElement | null>(null);
  console.log(SelectedItemId);

  const habitType = isHabit ? `Habit` : `Addiction`;

  useEffect(() => {
    if (SelectedItemId) {
      setHabitName(SelectedItemId.habitName);
      setMinValue(SelectedItemId.goal?.min || 0);
      setMaxValue(SelectedItemId.goal?.max || 0);
      setIsHabit(SelectedItemId.HabitType === `Habit`);
    }
  }, [SelectedItemId]);
  useEffect(() => {
    if (IsOpen && EditHabitInputRef.current) {
      EditHabitInputRef.current.focus();
    }
  }, [IsOpen]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHabitName(event.target.value);
  };

  function changeUnitHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedUnit = event.target.value;
    setUnit(selectedUnit);
  }

  function AddHabit() {
    console.log(habitName, minValue, maxValue);
    if (habitName !== null && isHabit) {
      AddItemHandler({
        id: Date.now() + Math.floor(Math.random() * 1000),
        HabitType: habitType,
        habitName,
        goal: { min: minValue as number, max: maxValue as number },
        Unit: unit,
      });
    }
    if (habitName !== null && !isHabit) {
      AddItemHandler({
        id: Date.now() + Math.floor(Math.random() * 1000),
        HabitType: habitType,
        habitName,
        time: new Date(),
      });
    }
  }
  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinValue(Number(event.target.value) || 0);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxValue(Number(event.target.value) || 0);
  };
  const handleSave = () => {
    EditItemHandler(SelectedItemId!.id, habitName, minValue, maxValue);
    OnSelect(null);
    OnClose();
  };

  const handleClose = () => {
    OnClose();
    setHabitName(``);
    setMaxValue(0);
    setMinValue(0);
    setState({ is: `selection` });
  };

  if (!IsOpen) {
    return null;
  }

  function HabitSelectionHandler(type: boolean) {
    setIsHabit(type);
    setState({ is: `name` });
  }
  function HandleNameSelected() {
    if (isHabit === true) {
      setState({ is: `minmax` });
      return;
    }
    if (isHabit === false) {
      AddHabit();
      setState({ is: `selection` });
    }
  }

  function HandleMinMaxSelected() {
    setState({ is: `selection` });
    AddHabit();
  }

  let content = null;

  if (SelectedItemId !== null && state.is === `selection`) {
    content = (
      <div>
        <input type="text" value={habitName} onChange={handleInputChange} />
        <input
          type="number"
          placeholder="min"
          value={minValue}
          onChange={handleMinChange}
        />
        <input
          type="number"
          placeholder="max"
          value={maxValue}
          onChange={handleMaxChange}
        />
        <Button onClick={handleSave} name={`Finish`} />
        <Button onClick={handleClose} name={`Exit`} />
      </div>
    );
  }

  if (state.is === `selection` && SelectedItemId === null) {
    content = (
      <div>
        <button onClick={() => HabitSelectionHandler(true)}>Habit</button>
        <button onClick={() => HabitSelectionHandler(false)}>Addiction</button>
        <Button onClick={handleClose} name={`Exit`} />
      </div>
    );
  }
  if (state.is === `name`) {
    content = (
      <div>
        <input type="text" onChange={handleInputChange} />
        <button onClick={() => HandleNameSelected()}>Next</button>
        <Button onClick={handleClose} name={`Exit`} />
      </div>
    );
  }
  if (state.is === `minmax`) {
    content = (
      <div>
        <input
          type="number"
          placeholder="min"
          value={minValue}
          onChange={handleMinChange}
        />
        <input
          type="number"
          placeholder="max"
          value={maxValue}
          onChange={handleMaxChange}
        />
        <select onChange={changeUnitHandler} value={unit}>
          {units.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
        <Button onClick={HandleMinMaxSelected} name={`Finish`} />
      </div>
    );
  }

  return <HabitModal>{content}</HabitModal>;
}
export default HabitModalContainer;
