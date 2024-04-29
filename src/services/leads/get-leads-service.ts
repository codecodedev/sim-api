import { LeadsRepository } from '@/repositories/leads-repository'
import { Leads } from '@prisma/client'

interface GetLeadsServiceRequest {
  page: number
  query?: string
}

interface GetLeadsServiceResponse {
  leads: Leads[]
  count: number
}

export class GetLeadsService {
  constructor(private leadsRepository: LeadsRepository) {}

  async execute({
    page,
    query,
  }: GetLeadsServiceRequest): Promise<GetLeadsServiceResponse> {
    const leads = await this.leadsRepository.findMany(page, query)
    const count = await this.leadsRepository.count(query)

    return { leads, count }
  }
}
