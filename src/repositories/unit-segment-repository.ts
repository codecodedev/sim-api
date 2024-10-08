import { Prisma, UnitSegment } from '@prisma/client'

export interface UnitSegmentRepository {
  create(data: Prisma.UnitSegmentUncheckedCreateInput): Promise<UnitSegment>
  createMany(
    unitId: string,
    segmentsIds?: string[],
  ): Promise<Prisma.BatchPayload>
  deleteUnitSegmentById(
    unitId: string,
    segmentId: string,
  ): Promise<Prisma.BatchPayload>
  deleteMany(unitId: string, segmentId?: string[]): Promise<Prisma.BatchPayload>
}
