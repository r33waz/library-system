import { Label } from "@radix-ui/react-dropdown-menu";
import {
    FieldErrors,
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
} from "react-hook-form";
import { Input } from "../ui/input";

interface IProps<T extends FieldValues> {
  label: string;
  type?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  rules?: RegisterOptions<T>;
  isDisable?: boolean;
  isRequired?: boolean;
  placeholder?: string;
}
function GenericInput<T extends FieldValues>({
  label,
  type,
  name,
  errors,
  register,
  isDisable,
  rules,
  isRequired,
  placeholder,
}: IProps<T>) {
  const errorMessage = errors?.[name]?.message as string | undefined;
  return (
    <div className="space-y-1">
      <Label className="text-sm font-normal">
        {label}
        {isRequired && <span className="text-red-500 ml-1">*</span>}
      </Label>

      <Input
        id={name}
        type={type}
        disabled={isDisable}
        aria-invalid={!!errorMessage}
        placeholder={placeholder}
        {...register(name, {
          required: isRequired ? `${label} is required` : false,
          ...rules,
        })}
      />

      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}

export default GenericInput;
