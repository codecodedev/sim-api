import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'
import { makeUserProfileService } from '@/services/factories/make-user-profile-service'
import { Role } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerUserProfile(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    active: z.boolean().default(false),
    phone: z.string(),
    cpf: z.string(),
    genre: z.string(),
    birthday: z.string(),
    pix: z.string(),
    role: z.nativeEnum(Role),
  })

  const body = registerBodySchema.parse(request.body)

  try {
    const registerUserProfileService = makeUserProfileService()

    const { user, profile } = await registerUserProfileService.execute({
      ...body,
    })
    const { password: _, ...userWithoutPassword } = user
    return replay.status(201).send({
      user: userWithoutPassword,
      profile,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return replay.status(409).send({ message: error.message })
    }
    throw error
  }
}
