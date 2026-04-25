import bcrypt from 'bcrypt'

const hashPassword = async (plainPassword: string): Promise<string> => {
  const saltRounds = 10
  return bcrypt.hash(plainPassword, saltRounds)
}

export default hashPassword