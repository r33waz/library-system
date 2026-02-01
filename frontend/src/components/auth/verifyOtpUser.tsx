import { useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function AuthOtpValidation({
  otp,
  setOtp,
}: {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  console.log("🚀 ~ AuthOtpValidation ~ otp:", otp);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const input = e.currentTarget;

      if (input.value) {
        // If current input has value, clear it
        setOtp((prevOtp: string[]) => {
          const otpArray = [...prevOtp];
          otpArray[index] = "";
          return otpArray;
        });
      } else if (index > 0) {
        // If current input is empty, clear previous and focus it
        setOtp((prevOtp: string[]) => {
          const otpArray = [...prevOtp];
          otpArray[index - 1] = "";
          return otpArray;
        });
        otpInputRefs.current[index - 1]?.focus();
      }
    }
  };

  const onSubmit = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      return;
    }
    console.log("Entered OTP:", enteredOtp);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        verify otp component {otp}
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 items-center">
            {Array.from({ length: 6 }).map((_, index) => (
              <Input
                key={index}
                type="text"
                maxLength={1}
                ref={(el) => {
                  if (el) otpInputRefs.current[index] = el;
                }}
                className="w-12 h-12 text-center text-2xl focus:border-green-primary focus:ring-1 focus:ring-green-primary"
                onKeyDown={(e) => handleKeyDown(e, index)}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[0-9]$/.test(value) || value === "") {
                    setOtp((prevOtp: string[]) => {
                      const otpArray = [...prevOtp];
                      otpArray[index] = value;
                      return otpArray;
                    });

                    if (value && index < 5) {
                      otpInputRefs.current[index + 1]?.focus();
                    }
                  }
                }}
                value={otp[index]}
              />
            ))}
          </div>
          <Button onClick={onSubmit} className="bg-green-primary ">
            Verify Otp
          </Button>
        </div>
      </div>
    </>
  );
}

export default AuthOtpValidation;
