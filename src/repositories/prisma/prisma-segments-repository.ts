import { Prisma, Segment } from "@prisma/client";
import { SegmentsRepository } from "../segments-repository";
import { prisma } from "@/lib/prisma";

export class PrismaSegmentsRepository implements SegmentsRepository {
  async create(data: Prisma.SegmentCreateInput): Promise<Segment> {
    const segments = await prisma.segment.create({ data });

    return segments;
  }
  async findMany(): Promise<Segment[]> {
    const segments = await prisma.segment.findMany();

    return segments;
  }
}
