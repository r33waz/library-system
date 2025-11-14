import { ReactNode } from "react";
import { Loading } from "./loading";

interface DashboardStatCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  bgColor: string;
  iconColor: string;
  loading?: boolean;
}
function StatsCard({
  icon,
  title,
  value,
  bgColor,
  iconColor,
  loading,
}: DashboardStatCardProps) {
  return (
    <div className="bg-white/70 dark:bg-dark-secondary h-24 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm">
      {loading ? (
        <div className={` flex justify-center items-center h-full`}>
          <Loading
            className="flex justify-center w-full  items-center "
            width={30}
            height={30}
          />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${bgColor}`}>
            <div className={`h-5 w-5 ${iconColor}`}>{icon}</div>
          </div>
          <div className="flex flex-col justify-center items-end w-full">
            <p className="text-lg">{title}</p>
            <p className="text-3xl font-bold ">{value}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatsCard;
