import * as bcrypt from 'bcrypt';

export const comparePasswords = async (
  userPassword: string,
  currentPassword: string,
) => {
  return await bcrypt.compare(currentPassword, userPassword);
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};
