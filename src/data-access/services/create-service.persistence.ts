import "server-only"

import { prisma } from "@/lib/prisma"
import { ICreateServiceDto } from "@/use-cases/services/types"

export async function createService(service: ICreateServiceDto): Promise<void> {
    await prisma.service.create({ data: service })
}