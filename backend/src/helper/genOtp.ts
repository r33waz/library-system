
export const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
};

export const otpExpiry = () => {
  return new Date(Date.now() + 5 * 60 * 1000);
};

export const generateSignupToken = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const signupTokenExpiry = () => {
  return new Date(Date.now() + 60 * 60 * 1000); // 1 hour
};

