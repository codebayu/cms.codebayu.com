import "server-only"

import { prisma } from "@/lib/prisma"
import { ICreateCareerDto } from "@/use-cases/careers/types"

export async function createCareer(career: ICreateCareerDto): Promise<void> {
    await prisma.career.create({ data: career })
}