import { Leads, Prisma, Timeline } from '@prisma/client'

export interface LeadsRepository {
  create(
    data: Prisma.LeadsUncheckedCreateInput,
    timeline: Omit<Timeline, 'id' | 'leadsId' | 'createdAt' | 'updatedAt'>[],
  ): Promise<Leads>
  findMany(page: number, where: Prisma.LeadsWhereInput): Promise<Leads[]>
  count(where: Prisma.LeadsWhereInput, unitsId?: string[]): Promise<number>
  findById(id: string): Promise<Leads | null>
  updateById(
    id: string,
    data: Prisma.LeadsUncheckedUpdateInput,
    timeline: Omit<Timeline, 'id' | 'leadsId' | 'createdAt' | 'updatedAt'>[],
  ): Promise<Leads>
  find(where: Partial<Leads>): Promise<Leads[]>
  groupBySteps(
    by: Prisma.LeadsScalarFieldEnum | Prisma.LeadsScalarFieldEnum[],
    where: Prisma.LeadsWhereInput,
  ): Promise<
    (Prisma.PickEnumerable<
      Prisma.LeadsGroupByOutputType,
      Prisma.LeadsScalarFieldEnum | Prisma.LeadsScalarFieldEnum[]
    > & { _count: { id: number } })[]
  >
  mountSelect(
    where: Prisma.LeadsWhereInput,
  ): Promise<(Leads & { timeline: Timeline[] })[]>
}
