import { LeadsRepository } from '@/repositories/leads-repository'
import { PrismaProfilesRepository } from '@/repositories/prisma/prisma-profile-repository'
import { Leads, Prisma } from '@prisma/client'
import { UserNotFoundError } from '../@errors/user-not-found-error'

interface GetLeadsServiceRequest {
  page: number
  name?: string
  phone?: string
  indicatorId?: string
  consultantId?: string | null | { not: null }
  segmentId?: string
  courseId?: string
  userId: string
  archived?: boolean
  matriculation?: boolean
  released?: boolean
}

interface GetLeadsServiceResponse {
  leads: Leads[]
  count: number
}

export class GetLeadsService {
  constructor(
    private leadsRepository: LeadsRepository,
    private profileRepository: PrismaProfilesRepository,
  ) {}

  async execute({
    page,
    name,
    phone,
    indicatorId,
    consultantId,
    segmentId,
    courseId,
    userId,
    archived,
    matriculation,
    released,
  }: GetLeadsServiceRequest): Promise<GetLeadsServiceResponse> {
    const profile = await this.profileRepository.findByUserId(userId)

    if (!profile) throw new UserNotFoundError()

    let unitsId
    if (profile.role === 'consultant') {
      unitsId = profile.units.map((unit) => unit.unit.id)
    }

    let where: Prisma.LeadsWhereInput = {
      name: { contains: name },
      phone: { contains: phone },
      archived,
      indicatorId,
      consultantId,
      matriculation,
      unitId: { in: unitsId ?? undefined },
      segmentId,
      courseId,
    }
    if (released !== undefined) {
      where = {
        ...where,
        released,
      }
    }
    const leads = await this.leadsRepository.findMany(page, where)
    const count = await this.leadsRepository.count(where)

    return { leads, count }
  }
}
