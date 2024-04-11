import { prisma } from '@/lib/prisma'
import { Prisma, Unit } from '@prisma/client'
import { UnitRepository } from '../unit-repository'
import { pagination } from '@/utils/constants/pagination'

export class PrismaUnitRepository implements UnitRepository {
  async findById(id: string): Promise<Unit | null> {
    const unit = await prisma.unit.findUnique({
      where: { id },
      include: {
        courses: {
          select: {
            course: true,
          },
        },
        segments: {
          select: {
            segment: true,
          },
        },
      },
    })

    return unit
  }

  async create(data: Prisma.UnitCreateInput): Promise<Unit> {
    const Unit = await prisma.unit.create({
      data: {
        name: data.name,
      },
    })

    return Unit
  }

  async findMany(page: number, query?: string): Promise<Unit[]> {
    const units = await prisma.unit.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      include: {
        courses: {
          select: {
            course: true,
          },
          take: pagination.total,
          skip: (page - 1) * pagination.total,
        },
        segments: {
          select: {
            segment: true,
          },
          take: pagination.total,
          skip: (page - 1) * pagination.total,
        },
      },
      take: pagination.total,
      skip: (page - 1) * pagination.total,
    })

    return units
  }
}
