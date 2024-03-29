import { prisma } from '@/lib/prisma'
import { Prisma, Profile, User } from '@prisma/client'
import { ProfilesRepository } from '../profiles-repository'

export class PrismaProfilesRepository implements ProfilesRepository {
  async findById(id: string): Promise<(Profile & { user: User }) | null> {
    const profile = await prisma.profile.findUnique({
      where: { id },
      include: {
        user: true,
      },
    })

    return profile
  }

  async findByUserId(id: string): Promise<(Profile & { user: User }) | null> {
    const profile = await prisma.profile.findUnique({
      where: { userId: id },
      include: {
        user: true,
      },
    })

    return profile
  }

  async create(data: Prisma.ProfileUncheckedCreateInput): Promise<Profile> {
    const user = await prisma.profile.create({ data })

    return user
  }
}
