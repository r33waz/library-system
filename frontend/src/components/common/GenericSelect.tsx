import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GenericSelect = ({
  title,
  options,
  selectedOption,
  setSelectedOption,
  className,
}: {
  title: string;
  className?: string;
  options: { label: string; value: string }[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}) => {
  return (
    <Select
      value={selectedOption}
      onValueChange={(value) => {
        if (value === "__clear__") {
          setSelectedOption(""); // Clear selection
        } else {
          setSelectedOption(value);
        }
      }}
    >
      <SelectTrigger className="md:w-80 w-full h-12  dark:bg-gray-6 border dark:border-white dark:text-white ">
        <SelectValue className="dark:text-white" placeholder={title} />
      </SelectTrigger>
      <SelectContent className={`${className}`}>
        <SelectGroup>
          {/* Special value to clear selection */}
          <SelectItem value="__clear__">-- Clear --</SelectItem>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default GenericSelect;
