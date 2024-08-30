import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { updateHabitData, editHabitData } from './HabitsActions';
import { HabitAddictionItem } from '../types/types';
interface HabitsProviderProps {
  children: ReactNode;
}

interface Store {
  Items: HabitAddictionItem[];
  AddItemHandler: (newItem: HabitAddictionItem) => void;
  EditItemHandler: (
    id: number,
    newName: string,
    min: number,
    max: number,
  ) => void;
  DeleteItemHandler: (id: number) => void;
  handleUpdateHabitData: (
    habitId: number,
    newData: { date: string; value: number; mood?: string },
  ) => void;
  ResetAddictionTimer: (id: number) => void;
  handleEditHabitData: (
    habitId: number,
    newData: { date: string; value: number; mood?: string },
  ) => void;
  addChallangeHandler: (habit: HabitAddictionItem) => void;
}
const LOCAL_STORAGE_KEY = `habits`;

const defaultMoodItem: HabitAddictionItem = {
  id: 0,
  habitName: `Mood`,
  HabitType: `Mood`,
  goal: { min: 3, max: 7 },
  Unit: `happiness`,
  data: [{ date: `15.08`, value: 2, mood: `sad` }],
};

const loadItems = () => {
  const savedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
  const items = savedItems ? JSON.parse(savedItems) : [];
  if (
    !items.find((item: HabitAddictionItem) => item.id === defaultMoodItem.id)
  ) {
    items.push(defaultMoodItem);
  }
  console.log(items);
  return items;
};

const saveItems = (items: HabitAddictionItem[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
};

const HabitsContext = createContext<Store | undefined>(undefined);

export function HabitsProvider({ children }: HabitsProviderProps) {
  const [items, setItems] = useState<HabitAddictionItem[]>(loadItems());

  useEffect(() => {
    saveItems(items);
    console.log(items);
  }, [items]);

  const addItemHandler = (newItem: HabitAddictionItem) => {
    setItems([...items, newItem]);
  };

  const editItemHandler = (
    id: number,
    newName: string,
    min: number,
    max: number,
  ) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, habitName: newName, goal: { min, max } }
          : item,
      ),
    );
  };

  const deleteItemHandler = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleUpdateHabitData = (
    habitId: number,
    newData: { date: string; value: number; mood?: string },
  ) => {
    setItems(updateHabitData(items, habitId, newData));
  };

  const handleEditHabitData = (
    habitId: number,
    newData: { date: string; value: number; mood?: string },
  ) => {
    setItems(editHabitData(items, habitId, newData));
  };

  const resetAddictionTimer = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, time: new Date() } : item,
      ),
    );
  };

  const addChallangeHandler = (habit: HabitAddictionItem) => {
    if (!items.find((item) => item.id === habit.id)) {
      setItems([...items, habit]);
    } else {
      console.log(`Challange already taken`);
    }
  };

  return (
    <HabitsContext.Provider
      value={{
        Items: items,
        AddItemHandler: addItemHandler,
        EditItemHandler: editItemHandler,
        DeleteItemHandler: deleteItemHandler,
        handleUpdateHabitData,
        ResetAddictionTimer: resetAddictionTimer,
        handleEditHabitData,
        addChallangeHandler,
      }}
    >
      {children}
    </HabitsContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(HabitsContext);
  if (context === undefined) {
    throw new Error(`useStore must be used within a StoreProvider`);
  }
  return context;
};
