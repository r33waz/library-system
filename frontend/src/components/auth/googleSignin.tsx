// GoogleSignInButton.tsx
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { googleLoginThunk } from "@/rtk/thunk/auth.thunk";
import { Button } from "../ui/button";

const GoogleSignInButton = ({ mode }: { mode: "login" | "signup" }) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  const handleGoogleSignIn = () => {
    dispatch(googleLoginThunk());
  };

  return (
    <Button
      type="button"
      onClick={handleGoogleSignIn}
      className="bg-white text-black border border-gray-300 py-2 px-4 w-full rounded-lg shadow hover:shadow-md flex items-center gap-2"
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google"
        className="w-5 h-5"
      />
      {mode === "login" ? (
        isLoading ? (
          <span>Singing in...</span>
        ) : (
          <span>Sign in with Google</span>
        )
      ) : isLoading ? (
        <span>Singing up...</span>
      ) : (
        <span>Sign up with Google</span>
      )}
    </Button>
  );
};

export default GoogleSignInButton;
