import { useEffect, useState } from "react";
import HabitSummaryChart from "../HabitSummaryChart/HabitSummaryChart";
import HappyIcon from '../../../../static/Happy.svg'
import SadIcon from '../../../../static/Sad.svg'
import AngryIcon from '../../../../static/Angry.svg'
import CalmIcon from '../../../../static/Calm.svg'
interface Error {
    message: string;
}

interface MoodData {
    day: number;
    mood: number;
    mood_type: string;
}

function AiGeneratedChart() {
    const [data, setData] = useState<MoodData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/predict');
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const jsonData: MoodData[] = await response.json();
                setData(jsonData);
            } catch (error) {
                setError({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const labels = data.map(d => `Day ${d.day}`);
    const moodValues = data.map(d => d.mood);
    const moodTypes = data.map(d => d.mood_type);

    const moodIcons: Record<string, string> = {
        happy: HappyIcon,
        sad: SadIcon,
        angry: AngryIcon,
        calm: CalmIcon,
    };

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Mood",
                data: moodValues,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                pointStyle: (context: any) => {
                    const mood = moodTypes[context.dataIndex];
                    const img = new Image();
                    img.src = moodIcons[mood] || '';
                    return img;
                },
                pointRadius: 10,
            }
        ]
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    title: function (tooltipItems: any) {
                        return `Day: ${tooltipItems[0].label}`;
                    },
                    label: function (tooltipItem: any) {
                        const value = tooltipItem.raw;
                        const mood = moodTypes[tooltipItem.dataIndex];
                        return `Happiness: ${value}, Mood: ${mood || 'N/A'}`;
                    }
                }
            }
        },
        scales: {
            y: {
                min: 0,
                max: 10,
                ticks: {
                    stepSize: 1
                }
            }
        },
        elements: {
            point: {
                radius: 5
            }
        }
    };

    return (
        <div>
            <HabitSummaryChart data={chartData} options={options} />
        </div>
    );
}

export default AiGeneratedChart;
