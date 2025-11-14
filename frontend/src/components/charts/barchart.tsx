import { ThemeContext } from "@/context/themeContext";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useContext } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  title?: string;
  labels: string[];
  datasetLabel: string;
  data: number[];
  backgroundColor?: string[] | string;
  className?: string;
};

export default function GenericBarChart({
  title = "Bar Chart",
  labels,
  datasetLabel,
  data,
  backgroundColor = [
    "#FF6384", // Pink
    "#36A2EB", // Blue
    "#FFCE56", // Yellow
    "#4BC0C0", // Teal
    "#9966FF", // Purple
    "#FF9F40", // Orange
    "#8DD1E1", // Light Blue
    "#FFBB28", // Gold
    "#00C49F", // Mint
    "#FF8042", // Deep Orange
    "#A28CFF", // Light Purple
    "#B0DE33", // Lime Green
    "#FF6666", // Coral Red
    "#33CC99", // Turquoise
    "#3399FF", // Sky Blue
    "#CC66CC", // Violet
    "#FFB6C1", // Light Pink
    "#99FF99", // Pale Green
    "#FFDB58", // Mustard
    "#87CEEB", // Light Sky Blue
  ],
  className,
}: Props) {
  const theme = useContext(ThemeContext);

  const hasData = data.length > 0;
  // Set text color based on theme
  const isDark = theme?.theme === "dark";
  const textColor = isDark ? "#ffffff" : "#000000";

  // useEffect(() => {
  //   if (theme?.theme === "dark") {
  //     textColor = "rgba(75,192,192,0.6)";
  //   } else {
  //     textColor = "rgba(75,192,192,0.6)";
  //   }
  // }, [theme?.theme]);

  const chartData = {
    labels,
    datasets: [
      {
        label: datasetLabel,
        data,
        backgroundColor,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", labels: { color: "#ffffff" } },
      title: {
        display: true,
        text: title,
        color: textColor,
      },

      tooltip: {
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0,0,0,0.1)",
        },
      },
      y: {
        display: hasData,
        ticks: {
          color: textColor,
          stepSize: 5,
          precision: 0,
        },
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0,0,0,0.1)",
        },
      },
    },
    resizeDelay: 200,
  };

  return (
    <div className={`  ${className}`}>
      {/* ⬅️ Make the height fixed/responsive */}
      <Bar data={chartData} options={chartOptions} style={{width: "100%", height: "100%"}}/>
    </div>
  );
}
