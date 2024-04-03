import "server-only";

import { prisma } from "@/lib/prisma";
import { ICareer } from "@/use-cases/careers/types";
import { toCareerDtoMapper } from "@/utils/dto";

export async function getCareer(itemId: string): Promise<ICareer> {
    const career = await prisma.career.findFirst({ where: { id: itemId } })
    if (!career) {
        throw new Error('data-access: no career found');
    }
    return toCareerDtoMapper(career)
}