import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'

interface GetUsersServiceResponse {
  users: object[]
}

export class GetUsersService {
  constructor(private userRepository: UsersRepository) {}

  async execute(): Promise<GetUsersServiceResponse> {
    const users = await this.userRepository.findMany()

    return { users }
  }
}
