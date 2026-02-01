import GoogleSignInButton from "@/components/auth/googleSignin";
import AuthOtpValidation from "@/components/auth/verifyOtpUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { LoginInterface } from "@/interface/auth.interface";
import { loginThunk } from "@/rtk/thunk/auth.thunk";
import { loginSchema } from "@/utils/formschema";
import { useMentTags } from "@/utils/metaTags";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill("")); // IGNORE  
  console.log("🚀 ~ LoginPage ~ otp:", otp)
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInterface>({
    resolver: yupResolver(loginSchema),
  });

  useMentTags("Sign In");

  const onSubmit = (data: LoginInterface) => {
    dispatch(loginThunk(data));
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center md:h-screen h-[100dvh]">
        <div className="grid grid-cols-1 lg:grid-cols-2  md:grid-cols-2 md:p-0 px-4">
          <div className="md:block hidden">
            <img
              loading="lazy"
              className="w-full h-[35rem] object-cover "
              src="/public/images/SingIn.jpg"
              alt="login"
            />
          </div>
          <form
            className="flex justify-center items-center md:px-0 p-6   "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-6  ">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-semibold ">Sign In</h1>
                {/* slogan */}
                <p className="text-sm tracking-wide  dark:text-dark-text-2">
                  Sign in to your account to continue your journey with us.
                </p>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <Label className="">Email</Label>
                  <Input
                    placeholder="Enter your email"
                    id="email"
                    {...register("email")}
                    className={`border ${errors?.email ? "border-error-red" : "border-gray-3"}   h-10 text-xs`}
                  />
                  <small className="text-xs text-error-red tracking-wider">
                    {errors?.email?.message}
                  </small>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="">Password</Label>
                  <Input
                    type="text"
                    placeholder="Enter your passoword"
                    id="password"
                    {...register("password")}
                    className={`border ${errors?.password ? "border-error-red" : "border-gray-3"}   h-10 text-xs`}
                  />
                  <small className="text-xs text-error-red tracking-wider">
                    {errors?.password?.message}
                  </small>
                </div>
              </div>
              <Button
                aria-label="login button"
                disabled={isLoading}
                className="w-full text-white h-9 sm:h-10  bg-green-primary hover:bg-green-primary/90"
              >
                {isLoading ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                  >
                    <g>
                      <circle
                        cx="12"
                        cy="2.5"
                        r="1.5"
                        fill="currentColor"
                        opacity=".14"
                      />
                      <circle
                        cx="16.75"
                        cy="3.77"
                        r="1.5"
                        fill="currentColor"
                        opacity=".29"
                      />
                      <circle
                        cx="20.23"
                        cy="7.25"
                        r="1.5"
                        fill="currentColor"
                        opacity=".43"
                      />
                      <circle
                        cx="21.5"
                        cy="12"
                        r="1.5"
                        fill="currentColor"
                        opacity=".57"
                      />
                      <circle
                        cx="20.23"
                        cy="16.75"
                        r="1.5"
                        fill="currentColor"
                        opacity=".71"
                      />
                      <circle
                        cx="16.75"
                        cy="20.23"
                        r="1.5"
                        fill="currentColor"
                        opacity=".86"
                      />
                      <circle cx="12" cy="21.5" r="1.5" fill="currentColor" />
                      <animateTransform
                        attributeName="transform"
                        calcMode="discrete"
                        dur="0.75s"
                        repeatCount="indefinite"
                        type="rotate"
                        values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"
                      />
                    </g>
                  </svg>
                ) : (
                  "Sign Up"
                )}
              </Button>
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t dark:border-text"></span>
                </div>
                <div className="relative flex justify-center ">
                  <span className="px-2 text-sm">or</span>
                </div>
              </div>
              {/* sigin with google with svg icon*/}
              <div className="flex justify-center">
                <GoogleSignInButton mode="login" />
              </div>
              <div className="flex justify-between items-center md:flex-row flex-col md:gap-0 gap-2">
                <div className="flex justify-center items-center gap-2">
                  <p className="text-sm">Don't have an account?</p>
                  <a
                    href="/auth/register"
                    className="text-green-primary  text-sm"
                  >
                    Sign Up
                  </a>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <a
                    href="/auth/forgot-password"
                    className="text-green-primary text-sm "
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <AuthOtpValidation setOtp={setOtp} otp={otp}/>
    </>
  );
};

export default LoginPage;
