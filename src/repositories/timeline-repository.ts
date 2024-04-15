import { Prisma, Timeline } from '@prisma/client'

export interface TimelineRepository {
  create(data: Prisma.TimelineUncheckedCreateInput): Promise<Timeline>
  findById(id: string): Promise<Timeline | null>
}
