import React from 'react';
import HabitSummaryChart from '../HabitSummaryChart/HabitSummaryChart';
import classes from './HabitSummaryItem.module.css';

interface Habit {
    id: number;
    habitName: string;
    HabitType: string;
    time?: Date;
    goal?: { min: number; max: number };
    data?: { date: string, value: number }[];
}

interface HabitsSummaryItemProps {
    item: Habit;
}

export function generateLastWeekDates(): string[] {
    const labels: string[] = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        labels.push(date.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' }));
    }

    return labels;
}


function HabitSummaryItem({ item }: HabitsSummaryItemProps) {
    const labels = generateLastWeekDates();
    const dataMap = item.data?.reduce((acc, { date, value }) => {
        acc[date] = value;
        return acc;
    }, {} as Record<string, number>) || {};

    const dataValues = labels.map(label => dataMap[label] || 0);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Value',
                data: dataValues,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
                label: 'Min Goal',
                data: new Array(7).fill(item.goal?.min || 0),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderDash: [5, 5],
                fill: false,
            },
            {
                label: 'Max Goal',
                data: new Array(7).fill(item.goal?.max || 0),
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderDash: [5, 5],
                fill: false,
            }
        ]
    };

    return (
        <div className={classes.habitSummaryItem}>
            <div className={classes.habitSummaryItemName}>
                <p>{item.habitName}</p>
            </div>
            <div className={classes.habitSummaryItemChart}>
            <HabitSummaryChart data={chartData} />
            </div>
        </div>
    );
}

export default HabitSummaryItem;
