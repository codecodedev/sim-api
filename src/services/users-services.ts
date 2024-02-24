import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'

interface usersCasesRequest {
  name: string
  email: string
  password: string
}

interface RegisterUserService {
  user: User
}

export class UserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: usersCasesRequest): Promise<RegisterUserService> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: password_hash,
    })

    return {
      user,
    }
  }
}
