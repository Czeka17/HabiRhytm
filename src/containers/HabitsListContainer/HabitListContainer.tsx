import { useStore } from '../../context/HabitsContext';
import { useState } from 'react';
import HabitsList from '../../components/Habits/HabitsList/HabitsList';
import HabitModalContainer from '../HabitModalContainer/HabitModalContainer';
import { HabitAddictionItem } from '../../types/types';
function HabitListContainer() {
  const { Items } = useStore();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] =
    useState<HabitAddictionItem | null>(null);

  const selectItem = (id: number | null) => {
    setSelectedItemId(Items.find((item) => item.id === id) || null);
  };

  function OpenModalHandler() {
    setModalIsOpen(true);
  }
  function CloseModalHandler() {
    setModalIsOpen(false);
  }
  return (
    <>
      <HabitsList
        Items={Items}
        OnOpen={OpenModalHandler}
        OnSelect={selectItem}
      />
      <HabitModalContainer
        OnClose={CloseModalHandler}
        IsOpen={modalIsOpen}
        SelectedItemId={selectedItemId}
        OnSelect={selectItem}
      />
    </>
  );
}
export default HabitListContainer;
