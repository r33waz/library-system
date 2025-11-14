import { AlertCircle, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface DateRangePickerProps {
  onRangeChange?: (startDate: string, endDate: string) => void;
  className?: string;
  borrowDate?: string;
  returnDate?: string;
}

function DateRangePicker({
  onRangeChange,
  className = "",
  borrowDate,
  returnDate,
}: DateRangePickerProps) {
  console.log("borrowDate", borrowDate, returnDate);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [dateRange, setDateRange] = useState<number>(0);

  // Handle date changes

  // Calculate date range when both dates are set
  useEffect(() => {
    if (startDate && endDate && !error) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDateRange(diffDays);
    } else {
      setDateRange(0);
    }
  }, [startDate, endDate, error]);

  const handelStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    if (endDate && newStartDate > endDate) {
      setError("Start date should be less than or equal to end date");
      return;
    }

    setError("");
    setStartDate(newStartDate);
    if (onRangeChange) {
      onRangeChange(newStartDate, endDate);
    }
  };

  const handelEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    if (startDate && newEndDate <= startDate) {
      setError("End date should be greater than start date");
      return;
    }

    setError("");
    setEndDate(newEndDate);
    if (onRangeChange) {
      onRangeChange(startDate, newEndDate);
    }
  };

  // Set today's date and 7 days from now as default values
  const setDefaultDates = (): void => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    // Format dates as YYYY-MM-DD
    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const formattedToday = formatDate(today);
    const formattedNextWeek = formatDate(nextWeek);

    setStartDate(formattedToday);
    setEndDate(formattedNextWeek);

    // Notify parent component if callback is provided
    if (onRangeChange) {
      onRangeChange(formattedToday, formattedNextWeek);
    }
  };

  // Clear all date selections
  const clearDates = (): void => {
    setStartDate("");
    setEndDate("");
    setError("");
    setDateRange(0);

    // Notify parent component if callback is provided
    if (onRangeChange) {
      onRangeChange("", "");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className={` rounded-lg ${className}`}>
      <div className="flex items-center mb-6">
        <Calendar className="mr-2 text-blue-600" size={20} />
        <h2 className="text-lg font-semibold text-gray-800">
          Select Date Range
        </h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center">
          <AlertCircle size={16} className="mr-2" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="flex flex-col w-full">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Start Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={borrowDate ? borrowDate : startDate}
              onChange={handelStartDate}
              min={today}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              data-testid="start-date-input"
            />
            <ChevronLeft
              className="absolute right-10 top-2.5 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>
        </div>

        <div className="flex flex-col w-full">
          <label className="mb-1 text-sm font-medium text-gray-700">
            End Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={returnDate ? returnDate : endDate}
              min={endDate || today}
              onChange={handelEndDate}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              data-testid="end-date-input"
            />
            <ChevronRight
              className="absolute right-10 top-2.5 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>
        </div>
      </div>

      {startDate && endDate && !error && (
        <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 text-blue-700">
          <p className="text-sm">
            Selected range:{" "}
            <span className="font-medium">{dateRange} days</span>
          </p>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={clearDates}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          data-testid="clear-dates-button"
        >
          Clear
        </button>
        <button
          onClick={setDefaultDates}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          data-testid="set-default-range-button"
        >
          Set Default Range
        </button>
      </div>
    </div>
  );
}

function DateRangeFilter({
  setStartDate,
  setEndDate,
  className,
}: {
  className?: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex flex-col sm:flex-row justify-between gap-4 w-full">
        <div className="flex flex-col w-full gap-2">
          <label className=" text-sm font-medium ">Start Date</label>
          <div className="relative md:w-[200px] w-full">
            <input
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 dark:bg-dark-secondary bg-white  rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              
              data-testid="start-date-input"
            />
            <ChevronLeft
              className="absolute right-10 top-2.5 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>
        </div>

        <div className="flex flex-col w-full gap-2">
          <label className=" text-sm font-medium ">End Date</label>
          <div className="relative md:w-[200px] w-full">
            <input
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 dark:bg-dark-secondary bg-white rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              data-testid="end-date-input"
            />
            <ChevronLeft
              className="absolute right-10 top-2.5 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { DateRangeFilter, DateRangePicker };
