import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

/**
 * A function to hash a password
 * @param password password to hash
 * @returns hased password
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

/**
 * A function to compare plain passwords with hashed passwords
 * @param plainPassword plain password inputted by user
 * @param hashedPassword hashed password stored in database
 * @returns result of the comparison
 */
export async function comparePasswords(
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
