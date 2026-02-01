import bcrypt from "bcryptjs";

//generating the hash password
const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (
  password: string,
  hashPassword: string,
): Promise<Boolean> => {
  return await bcrypt.compare(password, hashPassword);
};

export { comparePassword, hashPassword };
