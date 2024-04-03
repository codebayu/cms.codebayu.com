import "server-only";

import { prisma } from "@/lib/prisma";
import { ICareer } from "@/use-cases/careers/types";

export async function updateCareer(career: ICareer): Promise<void> {
    await prisma.career.update({ data: career, where: { id: career.id } })
}