import { PrismaCoursesRepository } from '@/repositories/prisma/prisma-courses-repository'
import { PrismaLeadsRepository } from '@/repositories/prisma/prisma-leads-repository'
import { PrismaProfilesRepository } from '@/repositories/prisma/prisma-profile-repository'
import { PrismaSegmentsRepository } from '@/repositories/prisma/prisma-segments-repository'
import { PrismaUnitRepository } from '@/repositories/prisma/prisma-unit-repository'
import { UpdateLeadStatusService } from '@/services/leads/update-lead-status'

export default function makeUpdateLeadStartService() {
  return new UpdateLeadStatusService(
    new PrismaLeadsRepository(),
    new PrismaProfilesRepository(),
    new PrismaUnitRepository(),
    new PrismaCoursesRepository(),
    new PrismaSegmentsRepository(),
  )
}