import { ThemeContext } from "@/context/themeContext";
import {
  ArcElement,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  Tooltip,
} from "chart.js";
import { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { Loading } from "../common/loading";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  title?: string;
  labels: string[];
  datasetLabel: string;
  data: number[];
  backgroundColor?: string | string[];
  className?: string;
  loading?: boolean;
};

export default function GenericPieChart({
  title = "Pie Chart",
  labels,
  datasetLabel,
  data,
  loading,
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
  const isDark = theme?.theme === "dark";
  const textColor = isDark ? "#ffffff" : "#000000";

  // Detect if we have actual data
  const hasData = Array.isArray(data) && data.some((value) => value > 0);

  // Build chart data with fallback
  const safeChartData = hasData
    ? {
        labels,
        datasets: [
          {
            label: datasetLabel,
            data,
            backgroundColor,
            borderColor: "#fff",
            borderWidth: 1,
          },
        ],
      }
    : {
        labels: ["No Data"],
        datasets: [
          {
            label: "No Data",
            data: [1], // dummy slice
            backgroundColor: ["#d3d3d3"], // light gray
            borderColor: "#fff",
            borderWidth: 1,
          },
        ],
      };

  const chartOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: textColor,
        },
      },
      title: {
        display: true,
        text: hasData ? title : `${title} (No Data)`,
        color: textColor,
      },
      tooltip: {
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
      },
    },
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center ${className}`}>
        <Loading
          className="flex justify-center w-full items-center"
          width={100}
          height={100}
        />
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <Pie data={safeChartData} options={chartOptions} />
    </div>
  );
}
