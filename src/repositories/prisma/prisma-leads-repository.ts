import { Leads, Prisma } from '@prisma/client'
import { LeadsRepository } from '../leads-repository'
import { prisma } from '@/lib/prisma'
import { pagination } from '@/utils/constants/pagination'

export class PrismaLeadsRepository implements LeadsRepository {
  updateById(id: string, data: Prisma.LeadsUpdateInput): Promise<Leads> {
    const lead = prisma.leads.update({
      where: {
        id,
      },
      data,
    })

    return lead
  }

  async findById(id: string): Promise<Leads | null> {
    const lead = await prisma.leads.findUnique({
      where: {
        id,
      },
      include: {
        consultant: {
          select: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
            phone: true,
            cpf: true,
          },
        },
        indicator: {
          select: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
            phone: true,
            cpf: true,
          },
        },
      },
    })

    return lead
  }

  async findManyArchived(
    page: number,
    query?: string,
    indicatorId?: string,
    consultantId?: string,
  ): Promise<Leads[]> {
    const whereIndicatorId = indicatorId
      ? {
          indicatorId: { contains: indicatorId },
        }
      : {}
    const whereConsultantId = consultantId
      ? {
          consultantId: { contains: consultantId },
        }
      : {}
    const leads = await prisma.leads.findMany({
      where: {
        ...whereIndicatorId,
        ...whereConsultantId,
        archived: true,
        name: {
          contains: query,
        },
      },
      include: {
        consultant: {
          select: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
            phone: true,
            cpf: true,
          },
        },
        indicator: {
          select: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
            phone: true,
            cpf: true,
          },
        },
      },
      take: pagination.total,
      skip: (page - 1) * pagination.total,
    })

    return leads
  }

  async findMany(
    page: number,
    query?: string,
    indicatorId?: string,
    consultantId?: string,
  ): Promise<Leads[]> {
    const whereIndicatorId = indicatorId
      ? {
          indicatorId: { contains: indicatorId },
        }
      : {}
    const whereConsultantId = consultantId
      ? {
          consultantId: { contains: consultantId },
        }
      : {}
    const leads = await prisma.leads.findMany({
      where: {
        ...whereIndicatorId,
        ...whereConsultantId,
        name: {
          contains: query,
        },
      },
      include: {
        consultant: {
          select: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
            phone: true,
            cpf: true,
          },
        },
        indicator: {
          select: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
            phone: true,
            cpf: true,
          },
        },
      },
      take: pagination.total,
      skip: (page - 1) * pagination.total,
    })

    return leads
  }

  async count(query?: string): Promise<number> {
    const leads = await prisma.leads.count({
      where: {
        name: {
          contains: query,
        },
      },
    })

    return leads
  }

  async create(data: Prisma.LeadsUncheckedCreateInput): Promise<Leads> {
    const leads = await prisma.leads.create({ data })

    return leads
  }
}
