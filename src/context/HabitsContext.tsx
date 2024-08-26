import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

interface HabitAddictionItem {
  id: number;
  habitName: string;
  HabitType: string;
  time?: Date;
  Unit?: string;
  goal?: { min: number; max: number };
  data?: { date: string; value: number; mood?: string }[];
}
interface HabitsProviderProps {
  children: ReactNode;
}

interface Store {
  Items: HabitAddictionItem[];
  ModalIsOpen: boolean;
  SelectedItemId: HabitAddictionItem | null;
  SelectItem: (id: number | null) => void;
  AddItemHandler: (newItem: HabitAddictionItem) => void;
  EditItemHandler: (
    id: number,
    newName: string,
    min: number,
    max: number,
  ) => void;
  DeleteItemHandler: (id: number) => void;
  ToggleModal: () => void;
  UpdateHabitData: (
    habitId: number,
    newData: { date: string; value: number; mood?: string },
  ) => void;
  ResetAddictionTimer: (id: number) => void;
  EditHabitData: (
    habitId: number,
    newData: { date: string; value: number; mood?: string },
  ) => void;
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] =
    useState<HabitAddictionItem | null>(null);

  useEffect(() => {
    saveItems(items);
    console.log(items);
  }, [items]);

  const selectItem = (id: number | null) => {
    setSelectedItemId(items.find((item) => item.id === id) || null);
  };

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

  const updateHabitData = (
    habitId: number,
    newData: { date: string; value: number; mood?: string },
  ) => {
    setItems(
      items.map((item) =>
        item.id === habitId
          ? { ...item, data: [...(item.data || []), newData] }
          : item,
      ),
    );
  };

  const EditHabitData = (
    habitId: number,
    newData: { date: string; value: number; mood?: string },
  ) => {
    setItems(
      items.map((item) =>
        item.id === habitId
          ? {
              ...item,
              data: item.data?.map((dataItem) =>
                dataItem.date === newData.date
                  ? { ...dataItem, ...newData }
                  : dataItem,
              ) || [newData],
            }
          : item,
      ),
    );
  };

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const resetAddictionTimer = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, time: new Date() } : item,
      ),
    );
  };

  return (
    <HabitsContext.Provider
      value={{
        Items: items,
        ModalIsOpen: modalIsOpen,
        SelectedItemId: selectedItemId,
        SelectItem: selectItem,
        AddItemHandler: addItemHandler,
        EditItemHandler: editItemHandler,
        DeleteItemHandler: deleteItemHandler,
        ToggleModal: toggleModal,
        UpdateHabitData: updateHabitData,
        ResetAddictionTimer: resetAddictionTimer,
        EditHabitData,
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
