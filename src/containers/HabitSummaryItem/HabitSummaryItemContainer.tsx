import { HabitAddictionItem } from '../../types/types';
import HappyIcon from '../../static/Happy.svg';
import SadIcon from '../../static/Sad.svg';
import AngryIcon from '../../static/Angry.svg';
import CalmIcon from '../../static/Calm.svg';
import { useState } from 'react';
import {
  filterDataFromLastWeek,
  filterMoodsFromLastWeek,
  generateLastMonthDates,
  generateLastWeekDates,
} from '../../lib/lib';
import HabitSummaryItem from '../../components/Summary/Habits/HabitSummaryItem/HabitSummaryItem';
import HabitSummaryChart from '../../components/Summary/Habits/HabitSummaryChart/HabitSummaryChart';
import HabitSummaryPieChart from '../../components/Summary/Habits/HabitSummaryPieChart/HabitSummaryPieChart';
import { Chart, PointElement, Tooltip, Legend } from 'chart.js';
Chart.register(PointElement, Tooltip, Legend);
interface HabitsSummaryItemContainerProps {
  item: HabitAddictionItem;
}
function HabitSummaryItemContainer({ item }: HabitsSummaryItemContainerProps) {
  const [isMonthChart, setIsMonthChart] = useState(false);
  const [moodStatus, setMoodStatus] = useState(``);
  const [weekStatus, setWeekStatus] = useState(``);
  function ChangeMoodChart() {
    setIsMonthChart(!isMonthChart);
  }

  function moodSummaryChecker() {
    const lastWeekMoods = filterMoodsFromLastWeek(item);
    const badMoods = [`sad`, `angry`];
    const goodMoods = [`happy`, `calm`];

    let bad = 0;
    let good = 0;

    for (let i = 0; i < lastWeekMoods.length; i++) {
      const mood = lastWeekMoods[i];
      if (mood) {
        if (badMoods.includes(mood)) {
          bad++;
        } else if (goodMoods.includes(mood)) {
          good++;
        }
      }
    }
    if (good > bad) {
      setMoodStatus(`You are doing well!`);
    } else if (bad > good) {
      setMoodStatus(`You need to improve...`);
    } else {
      setMoodStatus(`Well your humor is like rollercoaster`);
    }
  }

  function evaluateValues(item: HabitAddictionItem) {
    const lastWeekValues = filterDataFromLastWeek(item);
    if (!item.goal || lastWeekValues.length === 0) return;

    const { min, max } = item.goal;
    let belowMin = 0;
    let withinRange = 0;
    let aboveMax = 0;

    for (let i = 0; i < lastWeekValues.length; i++) {
      const value = lastWeekValues[i];
      if (value <= min) {
        belowMin++;
      } else if (value >= max!) {
        aboveMax++;
      } else {
        withinRange++;
      }
    }

    if (belowMin > withinRange && belowMin > aboveMax) {
      setWeekStatus(`below min`);
    } else if (aboveMax > withinRange && aboveMax > belowMin) {
      setWeekStatus(`above max`);
    } else {
      setWeekStatus(`ok`);
    }
  }

  const labels = isMonthChart
    ? generateLastMonthDates()
    : generateLastWeekDates();

  const dataMap =
    item.data?.reduce(
      (acc, { date, value, mood }) => {
        acc[date] = { value, mood };
        return acc;
      },
      {} as Record<string, { value: number; mood?: string }>,
    ) || {};

  const dataValues = labels!.map((label) => dataMap[label]?.value || 0);
  const moodValues = labels!.map((label) => dataMap[label]?.mood || ``);

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
              data: isMonthChart
                ? new Array(30).fill(item.goal.min)
                : new Array(8).fill(item.goal.min),
              borderColor: `rgba(255, 99, 132, 1)`,
              backgroundColor: `rgba(255, 99, 132, 0.2)`,
              borderDash: [5, 5],
              fill: false,
              pointRadius: 0,
            },
          ]
        : []),
      ...(item.goal?.max !== undefined
        ? [
            {
              label: item.HabitType === `Mood` ? `Good mood` : `Max goal`,
              data: isMonthChart
                ? new Array(30).fill(item.goal.max)
                : new Array(8).fill(item.goal.max),
              borderColor: `rgba(255, 159, 64, 1)`,
              backgroundColor: `rgba(255, 159, 64, 0.2)`,
              borderDash: [5, 5],
              fill: false,
              pointRadius: 0,
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

  const pieData = {
    labels:
      item.HabitType === `Mood`
        ? [`Happy`, `Sad`, `Angry`, `Calm`]
        : [`Below Min`, `Goal`, `Above Max`],
    datasets: [
      {
        label: `Mood Distribution`,
        data:
          item.HabitType === `Mood`
            ? [
                moodValues.filter((mood) => mood === `happy`).length,
                moodValues.filter((mood) => mood === `sad`).length,
                moodValues.filter((mood) => mood === `angry`).length,
                moodValues.filter((mood) => mood === `calm`).length,
              ]
            : [
                item.data?.filter(
                  (data) => item.goal && data.value <= item.goal.min,
                ).length || 0,
                item.data?.filter(
                  (data) =>
                    item.goal &&
                    item.goal.max !== undefined &&
                    data.value > item.goal.min &&
                    data.value < item.goal.max,
                ).length ||
                  item.data?.filter(
                    (data) =>
                      item.goal &&
                      item.goal.max === undefined &&
                      data.value > item.goal.min,
                  ).length ||
                  0,
                item.data?.filter(
                  (data) =>
                    item.goal &&
                    item.goal.max !== undefined &&
                    data.value >= item.goal.max,
                ).length || 0,
              ],
        backgroundColor: [
          `rgba(75, 192, 192, 0.6)`,
          `rgba(255, 99, 132, 0.6)`,
          `rgba(255, 159, 64, 0.6)`,
          `rgba(153, 102, 255, 0.6)`,
        ],
        hoverBackgroundColor: [
          `rgba(75, 192, 192, 1)`,
          `rgba(255, 99, 132, 1)`,
          `rgba(255, 159, 64, 1)`,
          `rgba(153, 102, 255, 1)`,
        ],
      },
    ],
  };
  return (
    <HabitSummaryItem
      OnChangeChart={ChangeMoodChart}
      OnMoodCheck={moodSummaryChecker}
      OnEvaluateValues={evaluateValues}
      item={item}
      moodStatus={moodStatus}
      weekStatus={weekStatus}
    >
      <div>
        <HabitSummaryChart data={chartData} options={options} />
      </div>
      <div>
        <HabitSummaryPieChart data={pieData} />
      </div>
    </HabitSummaryItem>
  );
}
export default HabitSummaryItemContainer;
