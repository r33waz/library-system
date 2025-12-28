import OtpInput from "@/components/common/otpInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { verifyOtpThunk } from "@/rtk/thunk/auth.thunk";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormValues = {
  email: string;
  otp: string[];
};

export default function OtpVerify() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isOtpVerifying, isOtpVerified } = useAppSelector(
    (state) => state.auth
  );
  // const { minutesLeft, secondsLeft, timeLeft } = useOtpTimer(5);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { email: "", otp: Array(6).fill("") },
  });

  const onSubmit = (data: FormValues) => {
    const otpCode = data.otp.join("");
    dispatch(verifyOtpThunk({ email: data.email, otp: otpCode }));
  };

  if (isOtpVerified) {
    navigate("/auth/login");
  }

  useEffect(() => {}, []);

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Verify Your Email
        </h1>
        <p className="text-center text-gray-500 text-base mt-2 mb-8">
          Enter your email and the 6-digit code we sent you
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-base">
              Email address
            </Label>
            <Input
              id="email"
              placeholder="johndoe@gmail.com"
              className={`h-14 text-base focus:ring-green-500/30 ${
                errors.email ? "border-error-red" : ""
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* OTP Field */}
          <OtpInput control={control} name="otp" />
          {/* <p className="text-center text-sm text-gray-500 mb-4">
            Time remaining: {minutesLeft}:
            {secondsLeft.toString().padStart(2, "0")}
          </p> */}
          <Button
            type="submit"
            className="w-full py-4 h-12 rounded-xl  text-lg text-white bg-green-600 hover:bg-green-700 transition"
          >
            {isOtpVerifying ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-8">
          Didn’t receive the code?{" "}
          <span className="text-green-600 cursor-pointer font-medium">
            Resend
          </span>
        </p>
      </div>
    </div>
  );
}
