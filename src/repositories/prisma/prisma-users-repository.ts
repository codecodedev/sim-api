import { prisma } from '@/lib/prisma'
import { pagination } from '@/utils/constants/pagination'
import { Prisma, Profile, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  findManyIndicator(
    page: number,
    query?: string,
  ): Promise<
    (Omit<User, 'password'> & { profile: Omit<Profile, 'userId'> | null })[]
  > {
    const userIndicator = prisma.user.findMany({
      where: {
        name: {
          contains: query,
        },
        profile: {
          role: 'indicator',
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        active: true,
        profile: {
          select: {
            id: true,
            cpf: true,
            genre: true,
            phone: true,
            role: true,
            pix: true,
            birthday: true,
            city: true
          },
        },
      },
      take: pagination.total,
      skip: (page - 1) * pagination.total,
    })

    return userIndicator
  }

  async findById(
    id: string,
  ): Promise<
    | (Omit<User, 'password'> & { profile: Omit<Profile, 'userId'> | null })
    | null
  > {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        active: true,
        profile: {
          select: {
            id: true,
            cpf: true,
            genre: true,
            phone: true,
            role: true,
            pix: true,
            birthday: true,
            city: true
          },
        },
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        profile: true,
      },
    })
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }

  async findMany(
    page: number,
    query?: string,
  ): Promise<
    (Omit<User, 'password'> & { profile: Omit<Profile, 'userId'> | null })[]
  > {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        active: true,
        profile: {
          select: {
            id: true,
            cpf: true,
            genre: true,
            phone: true,
            role: true,
            pix: true,
            birthday: true,
            city: true
          },
        },
      },
      take: pagination.total,
      skip: (page - 1) * pagination.total,
    })

    return users
  }

  async count(query?: string): Promise<number> {
    const users = await prisma.user.count({
      where: {
        name: {
          contains: query,
        },
      },
    })

    return users
  }

  async countIndicator(query?: string): Promise<number> {
    const users = await prisma.user.count({
      where: {
        name: {
          contains: query,
        },
        profile: {
          role: 'indicator',
        },
      },
    })

    return users
  }
}
