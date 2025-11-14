import { useEffect, useState } from "react";

const useDebouncing = (value: string, delay = 700) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler); // cleanup on value change
  }, [value, delay]);

  return debouncedValue;
};

export default useDebouncing;
