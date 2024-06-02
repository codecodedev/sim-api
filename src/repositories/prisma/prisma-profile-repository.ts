import { prisma } from '@/lib/prisma'
import {
  ExtractProfile,
  Organization,
  Prisma,
  Profile,
  Unit,
  User,
} from '@prisma/client'
import { ProfilesRepository } from '../profiles-repository'

export class PrismaProfilesRepository implements ProfilesRepository {
  async update(id: string, data: Prisma.ProfileUpdateInput): Promise<Profile> {
    const profile = await prisma.profile.update({
      where: {
        id,
      },
      data,
    })

    return profile
  }

  async findById(id: string): Promise<(Profile & { user: User }) | null> {
    const profile = await prisma.profile.findUnique({
      where: { id },
      include: {
        user: true,
      },
    })

    return profile
  }

  async findByUserId(id: string): Promise<
    | (Omit<Profile, 'userId'> & {
        extract_profile: ExtractProfile[]
        user: Omit<
          User & { organizations: { organization: Organization }[] },
          'password'
        >
      } & {
        units: { unit: Unit }[]
      })
    | null
  > {
    const profile = await prisma.profile.findUnique({
      where: { userId: id },
      select: {
        id: true,
        phone: true,
        cpf: true,
        genre: true,
        birthday: true,
        pix: true,
        role: true,
        userId: true,
        city: true,
        amountToReceive: true,
        extract_profile: true,
        units: {
          select: {
            unit: true,
          },
        },
        _count: {
          select: {
            leadsIndicator: {
              where: { documents: true },
            },
            leadsConsultant: {
              where: { documents: true },
            },
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            active: true,
            organizations: {
              select: {
                organization: true,
              },
            },
          },
        },
      },
    })

    return profile
  }

  async create(data: Prisma.ProfileUncheckedCreateInput): Promise<Profile> {
    const user = await prisma.profile.create({ data })

    return user
  }
}
