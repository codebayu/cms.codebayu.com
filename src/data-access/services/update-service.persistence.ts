import "server-only";

import { prisma } from "@/lib/prisma";
import { IService } from "@/use-cases/services/types";

export async function updateService(service: IService): Promise<void> {
    await prisma.service.update({ data: service, where: { id: service.id } })
}