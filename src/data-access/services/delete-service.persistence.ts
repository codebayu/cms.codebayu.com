import "server-only";

import { prisma } from "@/lib/prisma";

export async function deleteService(itemId: string): Promise<void> {
    await prisma.service.delete({ where: { id: itemId } })
}