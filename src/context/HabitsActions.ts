import { HabitAddictionItem } from '../types/types';

export const updateHabitData = (
  items: HabitAddictionItem[],
  habitId: number,
  newData: { date: string; value: number; mood?: string },
): HabitAddictionItem[] => {
  return items.map((item) =>
    item.id === habitId
      ? { ...item, data: [...(item.data || []), newData] }
      : item,
  );
};

export const editHabitData = (
  items: HabitAddictionItem[],
  habitId: number,
  newData: { date: string; value: number; mood?: string },
): HabitAddictionItem[] => {
  return items.map((item) =>
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
  );
};
