import useDebouncing from "@/hooks/debouncingHook";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

interface SearchInputProps {
  onChange: (value: string) => void;
  className?: string;
  value?: string;
}

const SearchInput = ({ onChange, className, value = "" }: SearchInputProps) => {
  const [search, setSearch] = useState<string>(value);

  useEffect(() => {
    setSearch(value); 
  }, [value]);

  const debouncedSearch = useDebouncing(search);

  useEffect(() => {
    if (onChange) {
      onChange(debouncedSearch);
    }
  }, [debouncedSearch, onChange]);

  return (
    <div className={`relative ${className}`}>
      <Input
        className="h-10 w-full dark:bg-gray-6 border dark:border-white dark:text-white dark:placeholder:text-white"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search ? (
        <X
          onClick={() => setSearch("")}
          className="absolute right-2 top-2 dark:text-white cursor-pointer"
        />
      ) : (
        <Search className="absolute right-2 top-2 dark:text-white" />
      )}
    </div>
  );
};
export default SearchInput;
