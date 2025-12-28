// components/OtpInput.tsx
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { Control, Controller } from "react-hook-form";

interface OtpInputProps {
  control: Control<any>;
  name: string;
  length?: number;
  disabled?: boolean;
}

export default function OtpInput({
  control,
  name,
  length = 6,
  disabled = false,
}: OtpInputProps) {
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex justify-center gap-4">
          {field.value.map((digit: string, index: number) => (
            <Input
              key={index}
              ref={(el) => {
                inputRef.current[index] = el;
              }}
              type="text"
              maxLength={1}
              inputMode="numeric"
              value={digit}
              disabled={disabled}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/, "");
                const newOtp = [...field.value];
                newOtp[index] = val;
                field.onChange(newOtp);

                if (val && index < length - 1) {
                  inputRef.current[index + 1]?.focus();
                }
              }}
              onKeyDown={(e) => {
                const otpArray = [...field.value];

                if (e.key === "Backspace") {
                  e.preventDefault();

                  if (otpArray[index] === "" && index > 0) {
                    inputRef.current[index - 1]?.focus();
                  }

                  otpArray[index] = "";
                  field.onChange(otpArray);
                }
              }}
              className="
                w-14 h-16 text-2xl font-semibold text-center rounded-xl
                border border-gray-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/30
                transition-all duration-150 focus:outline-none
              "
            />
          ))}
        </div>
      )}
    />
  );
}
