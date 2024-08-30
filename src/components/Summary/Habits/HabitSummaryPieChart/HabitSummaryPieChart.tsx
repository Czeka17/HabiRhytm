import { Pie } from 'react-chartjs-2';
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
  ArcElement,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

interface HabitSummaryChartData {
  labels: string[];
  datasets: ChartDataset<`pie`, number[]>[];
}

interface HabitSummaryProps {
  data: HabitSummaryChartData;
  options?: ChartOptions<`pie`>;
}

function HabitSummaryPieChart({ data, options }: HabitSummaryProps) {
  return (
    <div>
      <h2>Line Chart Example</h2>
      <Pie data={data} options={options} />
    </div>
  );
}

export default HabitSummaryPieChart;
