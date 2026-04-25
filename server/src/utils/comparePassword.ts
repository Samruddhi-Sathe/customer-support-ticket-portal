import bcrypt from 'bcrypt'

const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword)
}

export default comparePassword