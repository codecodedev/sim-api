import { UsersRepository } from '@/repositories/users-repository'
import { Profile, User } from '@prisma/client'

interface GetIndicatorProfileServiceRequest {
  page: number
  query?: string
}

interface GetIndicatorProfileServiceResponse {
  users: (Omit<User, 'password'> & {
    profile: Omit<Profile, 'userId'> | null
  })[]
}

export class GetIndicatorProfileService {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    page,
    query,
  }: GetIndicatorProfileServiceRequest): Promise<GetIndicatorProfileServiceResponse> {
    const users = await this.userRepository.findManyIndicator(page, query)

    return { users }
  }
}
