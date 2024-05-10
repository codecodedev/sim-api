import { PrismaProfilesRepository } from '@/repositories/prisma/prisma-profile-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UpdateProfileUserService } from '@/services/users/update-user-profile-service'

export function MakeUpdateProfileUserService() {
  return new UpdateProfileUserService(
    new PrismaUsersRepository(),
    new PrismaProfilesRepository(),
  )
}
