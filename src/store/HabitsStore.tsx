import { create } from "zustand";
import { devtools } from "zustand/middleware";

const DUMMY_ITEMS = [
	{
		id: 1,
		habitName: "Total of active work time",
		HabitType: "Habit",
		Unit: "hours",
		goal: { min: 3, max: 6 },
		data: [
			{ date: "15.08", value: 4 },
			{ date: "16.08", value: 4 },
			{ date: "17.08", value: 3 },
			{ date: "18.08", value: 3 },
			{ date: "19.08", value: 8 },
			{ date: "20.08", value: 6 },
		],
	},
	{
		id: 2,
		habitName: "Smoking",
		HabitType: "Addiction",
		time: new Date("2024-08-20T10:30:00"),
	},
	{
		id: 3,
		habitName: "kcal eated a day",
		HabitType: "Habit",
		Unit: "kcal",
		goal: { min: 2000, max: 3200 },
		data: [
			{ date: "15.08", value: 2500 },
			{ date: "16.08", value: 2600 },
			{ date: "17.08", value: 1900 },
			{ date: "18.08", value: 2200 },
			{ date: "19.08", value: 2000 },
			{ date: "20.08", value: 1700 },
		],
	},
	{
		id: 4,
		habitName: "Time spent on being physically active",
		HabitType: "Habit",
		Unit: "minutes",
		goal: { min: 15, max: 120 },
		data: [
			{ date: "15.08", value: 80 },
			{ date: "16.08", value: 25 },
			{ date: "17.08", value: 40 },
			{ date: "18.08", value: 20 },
			{ date: "19.08", value: 45 },
			{ date: "20.08", value: 10 },
		],
	},
	{
		id: 5,
		habitName: "temperature outside",
		HabitType: "Habit",
		Unit: "celcius",
		data: [
			{ date: "15.08", value: 27 },
			{ date: "16.08", value: 30 },
			{ date: "17.08", value: 25 },
			{ date: "18.08", value: 28 },
			{ date: "19.08", value: 25 },
			{ date: "20.08", value: 30 },
		],
	},
	{
		id: 0,
		habitName: "Mood",
		HabitType: "Mood",
		goal: { min: 3, max: 7 },
		Unit: "happiness",
		data: [
			{ date: "15.08", value: 2, mood: "sad" },
			{ date: "16.08", value: 3, mood: "angry" },
			{ date: "17.08", value: 6, mood: "calm" },
			{ date: "18.08", value: 7, mood: "happy" },
			{ date: "19.08", value: 8, mood: "happy" },
			{ date: "20.08", value: 5, mood: "calm" },
		],
	},
];

interface HabitAddictionItem {
	id: number;
	habitName: string;
	HabitType: string;
	time?: Date;
	Unit?: string;
	goal?: { min: number; max: number };
	data?: { date: string; value: number; mood?: string }[];
}

interface Store {
	Items: HabitAddictionItem[];
	ModalIsOpen: boolean;
	SelectedItemId: HabitAddictionItem | null;
	SelectedItemName: string;
	SelectItem: (id: number | null) => void;
	AddItemHandler: (newItem: HabitAddictionItem) => void;
	EditItemHandler: (
		id: number,
		newName: string,
		min: number,
		max: number
	) => void;
	DeleteItemHandler: (id: number) => void;
	ToggleModal: () => void;
	UpdateHabitData: (
		habitId: number,
		newData: { date: string; value: number; mood?: string }
	) => void;
	ResetAddictionTimer: (id: number) => void;
}

export const useStore = create<Store>()(
	devtools((set) => ({
		Items: DUMMY_ITEMS,
		ModalIsOpen: false,
		SelectedItemId: null,
		SelectedItemName: "",

		SelectItem: (id) =>
			set((state) => ({
				SelectedItemId: state.Items.find((item) => item.id === id),
			})),

		AddItemHandler: (newItem) =>
			set((state) => ({
				Items: [...state.Items, newItem],
			})),

		EditItemHandler: (id, newName, min, max) =>
			set((state) => ({
				Items: state.Items.map((item) =>
					item.id === id ? { ...item, habitName: newName, min, max } : item
				),
			})),

		DeleteItemHandler: (id) =>
			set((state) => ({
				Items: state.Items.filter((item) => item.id !== id),
			})),
		UpdateHabitData: (
			habitId: number,
			newData: { date: string; value: number; mood?: string }
		) =>
			set((state) => ({
				Items: state.Items.map((item) =>
					item.id === habitId
						? { ...item, data: [...(item.data || []), newData] }
						: item
				),
			})),

		ToggleModal: () =>
			set((state) => ({
				ModalIsOpen: !state.ModalIsOpen,
			})),

		ResetAddictionTimer: (id) =>
			set((state) => ({
				Items: state.Items.map((item) =>
					item.id === id ? { ...item, time: new Date() } : item
				),
			})),
	}))
);
