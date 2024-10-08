import { makeMountSelectSegmentsService } from '@/services/@factories/segments/mount-select-segment-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function MountSelectSegment(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const getMountSelectSegmentService = makeMountSelectSegmentsService()

  const { segments } = await getMountSelectSegmentService.execute()

  return replay.status(200).send({
    segments,
  })
}
