import { ProfilesRepository } from "@/repositories/profiles-repository";
import { Profile } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UsersRepository } from "@/repositories/users-repository";

interface GetUserProfileServiceRequest {
  id: string;
}

interface GetUserProfileServiceResponse {
  profile: Profile & { user: User };
}

export class GetUserProfileService {
  constructor(private profileRepository: ProfilesRepository) {}

  async execute({ id }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
    const profile = await this.profileRepository.findById(id);

    if (!profile) {
      throw new ResourceNotFoundError();
    }

    return {
      profile,
    };
  }
}
