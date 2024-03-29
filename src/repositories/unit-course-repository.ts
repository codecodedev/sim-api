import { Prisma, UnitCourses } from "@prisma/client";

export interface UnitCourseRepository {
  create(data: Prisma.UnitCoursesUncheckedCreateInput): Promise<UnitCourses>;
}
