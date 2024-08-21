import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const DUMMY_ITEMS = [
    { id: 1, habitName: 'Total of active work time', HabitType: 'Habit', goal:{min:2,max:6},  data: [
        { date: '17.08', value: 3 },
        { date: '19.08', value: 3 },
    ] },
    { id: 2, habitName: 'Smoking', HabitType: 'Addiction', time: new Date('2024-08-20T10:30:00')},
    { id: 3, habitName: 'Total of active work time3', HabitType: 'Habit', goal:{min:3,max:8},  data: [
        { date: '19.08', value: 3 },
    ] },
    { id: 4, habitName: 'Total of active work time4', HabitType: 'Habit', goal:{min:1,max:2},  data: [
        { date: '19.08', value: 3 },
    ]  },
    { id: 5, habitName: 'Total of active work time5', HabitType: 'Habit', goal:{min:2,max:7},  data: [
        { date: '19.08', value: 3 },
    ]  },
    { id: 0, habitName: 'Mood', HabitType: 'Mood',  data: [
        { date: '19.08', value: 3 },
    ]  },
];

interface HabitAddictionItem {
    id: number;
    habitName: string;
    HabitType: string;
    time?:Date;
    goal?:{min:number, max:number}
    data?: { date: string, value: number }[];
}

interface Store {
    Items: HabitAddictionItem[];
    ModalIsOpen: boolean;
    SelectedItemId: HabitAddictionItem | null;
    SelectedItemName: string;
    SelectItem:(id:number | null) => void
    AddItemHandler: (newItem: HabitAddictionItem) => void;
    EditItemHandler: (id: number, newName: string,min:number,max:number) => void;
    DeleteItemHandler: (id: number) => void;
    ToggleModal: () => void;
    UpdateHabitData: (habitId: number, newData: { date: string, value: number }) => void;
    ResetAddictionTimer:(id:number) => void;
}

export const useStore = create<Store>()(
    devtools((set) => ({
        Items: DUMMY_ITEMS,
        ModalIsOpen: false,
        SelectedItemId: null,
        SelectedItemName: '',

        SelectItem: (id) => set((state) => ({
            SelectedItemId: state.Items.find(item => item.id === id)
        })),

        AddItemHandler: (newItem) => set((state) => ({
            Items: [...state.Items, newItem]
        })),

        EditItemHandler: (id, newName,min,max) => set((state) => ({
            Items: state.Items.map(item =>
                item.id === id
                    ? { ...item, habitName: newName,min,max }
                    : item
            )
        })),

        DeleteItemHandler: (id) => set((state) => ({
            Items: state.Items.filter((item) => item.id !== id)
        })),
        UpdateHabitData: (habitId: number, newData: { date: string, value: number }) => set((state) => ({
            Items: state.Items.map(item => 
                item.id === habitId 
                ? { ...item, data: [...(item.data || []), newData] }
                : item
            )
        })),

        ToggleModal: () => set((state) => ({
            ModalIsOpen: !state.ModalIsOpen
        })),

        ResetAddictionTimer: (id) => set((state) => ({
            Items: state.Items.map(item => item.id === id ? {...item, time:new Date()} : item)
        }))
    }))
);
