export interface HabitAddictionItem {
  id: number;
  habitName: string;
  HabitType: string;
  time?: Date;
  Unit?: string;
  goal?: { min: number; max?: number };
  data?: { date: string; value: number; mood?: string }[];
}
