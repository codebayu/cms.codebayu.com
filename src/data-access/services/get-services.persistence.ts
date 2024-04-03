import "server-only";

import { prisma } from "@/lib/prisma";
import { toServiceDtoMapper } from "@/utils/dto";
import { IService } from "@/use-cases/services/types";

export async function getServices(): Promise<IService[]> {
    const services = await prisma.service.findMany({ take: 10 })
    return services.map(toServiceDtoMapper)
}