import { Label } from "@radix-ui/react-dropdown-menu";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Input } from "../ui/input";

interface IInputProps<T extends FieldValues> {
  label: string;
  type?: string;
  name: Path<T>;
  control: Control<T>;
  isDisable?: boolean;
  isRequired?: boolean;
  placeholder?: string;
}

function GenericInput<T extends FieldValues>({
  label,
  type = "text",
  name,
  control,
  isDisable = false,
  isRequired,
  placeholder,
}: IInputProps<T>) {
  return (
    <div className="space-y-1">
      <Label className="text-sm">
        {label}
        {isRequired && <span className="text-red-500 ml-1">*</span>}
      </Label>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Input
              id={name}
              {...field}
              type={type}
              disabled={isDisable}
              placeholder={placeholder}
              className={`${fieldState.error ? "border-red-400" : ""}`}
            />

            {fieldState.error && (
              <p className="text-red-500 text-xs font-light mt-1">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}

export default GenericInput;
