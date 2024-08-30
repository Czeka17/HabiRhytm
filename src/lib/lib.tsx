import { HabitAddictionItem } from '../types/types';

export function getTimeDifference(date: Date): string {
  const now = new Date();
  const dateOfItem = new Date(date);
  const difference = now.getTime() - dateOfItem.getTime();

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  if (days === 0) {
    return `${hours}h ${minutes}m`;
  }
  if (days === 0 && hours === 0) {
    return `${minutes}m`;
  }
  return `${days}d ${hours}h ${minutes}m`;
}

export function generateLastWeekDates(): string[] {
  const labels: string[] = [];
  const today = new Date();

  for (let i = 7; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    labels.push(
      date.toLocaleDateString(`pl-PL`, { day: `2-digit`, month: `2-digit` }),
    );
  }

  return labels;
}

export function generateLastMonthDates(): string[] {
  const labels: string[] = [];
  const today = new Date();

  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    labels.push(
      date.toLocaleDateString(`pl-PL`, { day: `2-digit`, month: `2-digit` }),
    );
  }

  return labels;
}

export function filterDataFromLastWeek(item: HabitAddictionItem) {
  if (!item.data) return [];

  const today = new Date();
  const currentYear = today.getFullYear();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);

  const filteredData = item.data.filter((dataItem) => {
    const [day, month] = dataItem.date.split(`.`).map(Number);
    const dataDate = new Date(currentYear, month - 1, day);

    return dataDate >= oneWeekAgo && dataDate <= today;
  });

  return filteredData.map((dataItem) => dataItem.value);
}

export function filterMoodsFromLastWeek(item: HabitAddictionItem) {
  if (!item.data) return [];

  const today = new Date();
  const currentYear = today.getFullYear();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);

  return item.data
    .filter((dataItem) => {
      const [day, month] = dataItem.date.split(`.`).map(Number);
      const dataDate = new Date(currentYear, month - 1, day);

      return dataDate >= oneWeekAgo && dataDate <= today;
    })
    .map((dataItem) => dataItem.mood);
}
