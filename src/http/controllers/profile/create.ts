import { UserNotFoundError } from '@/services/@errors/user-not-found-error'
import { makeCreateProfileService } from '@/services/@factories/profile/make-create-profile-service'

import { Role } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const bodySchema = z.object({
  phone: z.string(),
  cpf: z.string(),
  genre: z.string(),
  birthday: z.string(),
  pix: z.string(),
  role: z.nativeEnum(Role),
  city: z.string(),
})

export async function Create(request: FastifyRequest, reply: FastifyReply) {
  const body = bodySchema.parse(request.body)

  const createProfileService = makeCreateProfileService()

  const userId = request.user.sub

  try {
    const { profile } = await createProfileService.execute({ ...body, userId })

    return reply.status(201).send(profile)
    // TODO: verify catch error 404 - not able
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    return reply.status(500).send({ message: 'Internal server error' })
  }
}
