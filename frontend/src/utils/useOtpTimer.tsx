import { useEffect, useState } from "react";

export default function useOtpTimer(minutes = 5) {
  const [timeLeft, setTimeLeft] = useState<number>(0); // seconds

  useEffect(() => {
    let expiry = localStorage.getItem("otpExpiry");
    let expiryTime: number;

    if (expiry) {
      expiryTime = parseInt(expiry);
    } else {
      // first time: set expiry
      expiryTime = Date.now() + minutes * 60 * 1000;
      localStorage.setItem("otpExpiry", expiryTime.toString());
    }

    const interval = setInterval(() => {
      const diff = Math.max(0, Math.ceil((expiryTime - Date.now()) / 1000));
      setTimeLeft(diff);

      if (diff <= 0) {
        clearInterval(interval);
        localStorage.removeItem("otpExpiry"); // allow resend
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes]);

  const minutesLeft = Math.floor(timeLeft / 60);
  const secondsLeft = timeLeft % 60;

  return { minutesLeft, secondsLeft, timeLeft };
}
