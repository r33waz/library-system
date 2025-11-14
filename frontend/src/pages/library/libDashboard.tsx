import GenericBarChart from "@/components/charts/barchart";
import GenericPieChart from "@/components/charts/pieChart";
import { DateRangeFilter } from "@/components/common/dateFilter";
import StatsCard from "@/components/common/statsCard";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getLibraryBookCategoryStats } from "@/rtk/thunk/category.thunk";
import { getLibraryBookGenreStats } from "@/rtk/thunk/genre.thunk";
import {
  getLibraryBorrowstats,
  getLibraryStats,
} from "@/rtk/thunk/library.thunk";
import { useMentTags } from "@/utils/metaTags";
import {
  ActivitySquare,
  BookOpen,
  HelpingHand,
  Library,
  TimerOffIcon,
  TimerResetIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

const LibraryDashboard = () => {
  useMentTags("Library Dashboard - Library Management System");

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const dispatch = useAppDispatch();
  const { userDeatails } = useAppSelector((state) => state?.auth);
  const { libraryStats, libraryStatsLoading } = useAppSelector(
    (state) => state?.library
  );

  const { libraryBookGenreStats, libraryBookStatsLoading } = useAppSelector(
    (state) => state?.genre
  );
  const { libraryBookCategoryStats, libraryBookCategoryStatsLoading } =
    useAppSelector((state) => state?.category);
  console.log(
    "🚀 ~ LibraryDashboard ~ libraryBookCategoryStats:",
    libraryBookCategoryStats
  );

  useEffect(() => {
    dispatch(getLibraryStats({ startDate, endDate }));
  }, [startDate, endDate]);

  useEffect(() => {
    dispatch(getLibraryBorrowstats());
    dispatch(getLibraryBookGenreStats());
    dispatch(getLibraryBookCategoryStats());
  }, []);

  return (
    <div className="min-h-screen   p-6">
      <div className="w-full ">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <Library className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-700 bg-clip-text text-transparent">
                Library Dashboard
              </h1>
              <p className="dark:text-white text-black mt-1">
                Welcome to
                <span className="font-medium text-2xl  text-green-primary px-2">
                  {userDeatails?.library?.name ??
                    userDeatails?.libraryEmp?.library?.name}
                </span>
                library dashboard
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="flex flex-col gap-4 mt-10">
            <div className="flex w-full  items-center">
              <DateRangeFilter
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                className="md:max-w-[350px] w-full "
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <StatsCard
                icon={<BookOpen />}
                title="Total Books"
                value={libraryStats?.totalBooks || 0}
                bgColor="bg-blue-100"
                iconColor="text-blue-600"
                loading={libraryStatsLoading}
              />
              <StatsCard
                icon={<ActivitySquare />}
                title="Active Borrow"
                value={libraryStats?.totalActiveBorrow || 0}
                bgColor="bg-green-100"
                iconColor="text-green-600"
                loading={libraryStatsLoading}
              />
              <StatsCard
                icon={<HelpingHand />}
                title="Borrow History"
                value={libraryStats?.totalBorrowed || 0}
                bgColor="bg-purple-100"
                iconColor="text-purple-600"
                loading={libraryStatsLoading}
              />
              <StatsCard
                icon={<TimerOffIcon />}
                title="Overdue Borrow"
                value={libraryStats?.totalOverdue || 0}
                bgColor="bg-orange-100"
                iconColor="text-orange-600"
                loading={libraryStatsLoading}
              />
              <StatsCard
                icon={<TimerResetIcon />}
                title="Pending Borrow"
                value={libraryStats?.totalPending || 0}
                bgColor="bg-orange-100"
                iconColor="text-orange-600"
                loading={libraryStatsLoading}
              />
            </div>
            <GenericBarChart
              title="Borrow History"
              labels={libraryBookGenreStats?.map((item) => item?.genre) || []}
              data={
                libraryBookGenreStats?.map((item) => Number(item?.count)) || []
              }
              datasetLabel=""
              className="bg-white px-6 py-4 rounded-md dark:bg-dark-secondary dark:text-white w-full"
            />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <GenericPieChart
                loading={libraryBookStatsLoading}
                title="Genre Distribution"
                labels={libraryBookGenreStats?.map((item) => item?.genre) || []}
                data={
                  libraryBookGenreStats?.map((item) => Number(item?.count)) ||
                  []
                }
                datasetLabel=""
                className="bg-white px-6 py-5 rounded-md dark:bg-dark-secondary dark:text-white flex justify-center items-center md:h-[600px] h-[400px]"
              />
              <GenericPieChart
                title="Category Distribution"
                labels={
                  libraryBookCategoryStats?.map((item) => item?.category) || []
                }
                data={
                  libraryBookCategoryStats?.map((item) =>
                    Number(item?.count)
                  ) || []
                }
                datasetLabel=""
                className="bg-white px-6 py-5 rounded-md dark:bg-dark-secondary dark:text-white flex justify-center items-center md:h-[600px] h-[400px]"
                loading={libraryBookCategoryStatsLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryDashboard;
