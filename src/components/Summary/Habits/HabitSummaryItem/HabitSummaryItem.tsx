import HabitSummaryChart from '../HabitSummaryChart/HabitSummaryChart';
import { Chart, PointElement, Tooltip, Legend } from 'chart.js';
import classes from './HabitSummaryItem.module.css';
import HappyIcon from '../../../../static/Happy.svg';
import SadIcon from '../../../../static/Sad.svg';
import AngryIcon from '../../../../static/Angry.svg';
import CalmIcon from '../../../../static/Calm.svg';

Chart.register(PointElement, Tooltip, Legend);

interface Habit {
  id: number;
  habitName: string;
  HabitType: string;
  time?: Date;
  Unit?: string;
  goal?: { min: number; max: number };
  data?: { date: string; value: number; mood?: string }[];
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
    labels.push(
      date.toLocaleDateString(`pl-PL`, { day: `2-digit`, month: `2-digit` }),
    );
  }

  return labels;
}

function HabitSummaryItem({ item }: HabitsSummaryItemProps) {
  const labels = generateLastWeekDates();
  const dataMap =
    item.data?.reduce(
      (acc, { date, value, mood }) => {
        acc[date] = { value, mood };
        return acc;
      },
      {} as Record<string, { value: number; mood?: string }>,
    ) || {};

  const dataValues = labels.map((label) => dataMap[label]?.value || 0);
  const moodValues = labels.map((label) => dataMap[label]?.mood || ``);

  const moodIcons: Record<string, string> = {
    happy: HappyIcon,
    sad: SadIcon,
    angry: AngryIcon,
    calm: CalmIcon,
  };

  const maxDataValue = Math.max(...dataValues, 0);
  const goalMax = item.goal?.max || 0;
  const yAxisMax =
    item.HabitType === `Mood` ? 10 : Math.max(maxDataValue, goalMax);

  const chartData = {
    labels,
    datasets: [
      {
        label: item.Unit,
        data: dataValues,
        borderColor: `rgba(75, 192, 192, 1)`,
        backgroundColor: `rgba(75, 192, 192, 0.2)`,
        pointStyle:
          item.HabitType === `Mood`
            ? (context: any) => {
                const mood = moodValues[context.dataIndex];
                const img = new Image();
                img.src = moodIcons[mood] || ``;
                return img;
              }
            : `circle`,
        pointRadius: item.HabitType === `Mood` ? 10 : 5,
        tension: 0.4,
      },
      ...(item.goal?.min !== undefined
        ? [
            {
              label: item.HabitType === `Mood` ? `Bad mood` : `Min goal`,
              data: new Array(7).fill(item.goal.min),
              borderColor: `rgba(255, 99, 132, 1)`,
              backgroundColor: `rgba(255, 99, 132, 0.2)`,
              borderDash: [5, 5],
              fill: false,
            },
          ]
        : []),
      ...(item.goal?.max !== undefined
        ? [
            {
              label: item.HabitType === `Mood` ? `Good mood` : `Max goal`,
              data: new Array(7).fill(item.goal.max),
              borderColor: `rgba(255, 159, 64, 1)`,
              backgroundColor: `rgba(255, 159, 64, 0.2)`,
              borderDash: [5, 5],
              fill: false,
            },
          ]
        : []),
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          title: function (tooltipItems: any) {
            const date = tooltipItems[0].label;
            return `Date: ${date}`;
          },
          label: function (tooltipItem: any) {
            const value = tooltipItem.raw;
            const mood = moodValues[tooltipItem.dataIndex];
            if (mood) {
              return `Happiness: ${value}, Mood: ${mood || `N/A`}`;
            }
            if (!mood) {
              return `${item.Unit} ${value}`;
            }
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: yAxisMax,
        ticks: {
          stepSize: 1,
        },
      },
    },
    elements: {
      point: {
        radius: 5,
      },
    },
  };

  return (
    <div className={classes.habitSummaryItem}>
      <div className={classes.habitSummaryItemName}>
        <p>{item.habitName}</p>
      </div>
      <div className={classes.habitSummaryItemChart}>
        <HabitSummaryChart data={chartData} options={options} />
      </div>
    </div>
  );
}

export default HabitSummaryItem;
