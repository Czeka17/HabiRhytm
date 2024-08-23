import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartDataset,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface HabitSummaryChartData {
  labels: string[];
  datasets: ChartDataset<`line`, number[]>[];
}

interface HabitSummaryProps {
  data: HabitSummaryChartData;
  options?: ChartOptions<`line`>;
}

function HabitSummaryChart({ data, options }: HabitSummaryProps) {
  return (
    <div>
      <h2>Line Chart Example</h2>
      <Line data={data} options={options} />
    </div>
  );
}

export default HabitSummaryChart;
