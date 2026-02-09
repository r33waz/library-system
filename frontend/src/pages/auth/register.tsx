import GoogleSignInButton from "@/components/auth/googleSignin";
import GenericInput from "@/components/common/GenericInput";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RegisterInterface } from "@/interface/auth.interface";
import { registerThunk } from "@/rtk/thunk/auth.thunk";
import { registerSchema } from "@/utils/formschema";
import { useMentTags } from "@/utils/metaTags";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterInterface>({
    resolver: yupResolver(registerSchema),
  });

  useMentTags("Sign Up");
  const onSubmit = (data: RegisterInterface) => {
    dispatch(registerThunk(data))
      .unwrap()
      .then(() => {
        navigate("/auth/login");
      })
      .catch(() => {
        navigate("#");
      });
  };
  return (
    <div className="flex h-screen w-full items-center justify-center py-4 sm:py-6 md:py-0">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8">
        {/* Image section */}
        <div className="hidden md:block h-full">
          <img
            loading="lazy"
            className="w-full max-h-[40rem] object-cover rounded-lg"
            src="/images/SingIn.jpg"
            alt="login"
          />
        </div>

        {/* Form section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center w-full max-w-md mx-auto px-4 sm:px-0"
        >
          <div className="space-y-4 ">
            {/* Header */}
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                Sign Up
              </h1>
              <p className="text-xs sm:text-sm tracking-wide dark:text-dark-text-2">
                Sign up today and start your journey to success!
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col gap-1">
                <GenericInput<RegisterInterface>
                  label="Email"
                  name="email"
                  type="text"
                  control={control}
                  isRequired
                  placeholder="Enter your email"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3   ">
                <div className="flex flex-col gap-1">
                  <GenericInput<RegisterInterface>
                    label="First Name"
                    name="firstname"
                    type="text"
                    control={control}
                    isRequired
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <GenericInput<RegisterInterface>
                    label="Last Name"
                    name="lastname"
                    type="text"
                    control={control}
                    isRequired
                    placeholder="Enter your last nmame"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <GenericInput<RegisterInterface>
                  label="Phone Number"
                  name="phonenumber"
                  type="text"
                  control={control}
                  isRequired
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="flex flex-col gap-1 relative">
                <GenericInput<RegisterInterface>
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  control={control}
                  isRequired
                  placeholder="Enter your password"
                />

                <div className="absolute right-3 top-10 transform -translate-y-1/2">
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0" />
                        <path d="M2 12c1.6-4.097 5.336-7 10-7s8.4 2.903 10 7c-1.6 4.097-5.336 7-10 7s-8.4-2.903-10-7" />
                      </g>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      >
                        <path d="M2.55 13.406c-.272-.373-.408-.56-.502-.92a2.5 2.5 0 0 1 0-.971c.094-.361.23-.548.502-.92C4.039 8.55 7.303 5 12 5s7.961 3.55 9.45 5.594c.272.373.408.56.502.92a2.5 2.5 0 0 1 0 .971c-.094.361-.23.548-.502.92C19.961 15.45 16.697 19 12 19s-7.961-3.55-9.45-5.594" />
                        <path d="M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4m9-11L3 21" />
                      </g>
                    </svg>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1 relative">
                <GenericInput<RegisterInterface>
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  control={control}
                  isRequired
                  placeholder="Enter your confirm password"
                />

                <div className="absolute right-3 top-10 transform -translate-y-1/2">
                  {showConfirmPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0" />
                        <path d="M2 12c1.6-4.097 5.336-7 10-7s8.4 2.903 10 7c-1.6 4.097-5.336 7-10 7s-8.4-2.903-10-7" />
                      </g>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      >
                        <path d="M2.55 13.406c-.272-.373-.408-.56-.502-.92a2.5 2.5 0 0 1 0-.971c.094-.361.23-.548.502-.92C4.039 8.55 7.303 5 12 5s7.961 3.55 9.45 5.594c.272.373.408.56.502.92a2.5 2.5 0 0 1 0 .971c-.094.361-.23.548-.502.92C19.961 15.45 16.697 19 12 19s-7.961-3.55-9.45-5.594" />
                        <path d="M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4m9-11L3 21" />
                      </g>
                    </svg>
                  )}
                </div>
              </div>
            </div>

            {/* Sign in button */}
            <Button
              aria-label="Sign up button"
              disabled={isLoading}
              className="w-full text-white  h-9 sm:h-10 bg-green-primary hover:bg-green-primary/90"
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

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t dark:border-text"></span>
              </div>
              <div className="relative flex justify-center ">
                <span className="px-2 text-sm">or</span>
              </div>
            </div>

            {/* Google sign in */}
            <div className="flex justify-center">
              <GoogleSignInButton mode="signup" />
            </div>

            {/* Footer links */}
            <div className="flex flex-col xs:flex-row justify-between items-center gap-2 sm:gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-1">
                <p>Already have an account?</p>
                <a
                  href="/auth/login"
                  className="text-green-primary hover:underline"
                >
                  Sign In
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
