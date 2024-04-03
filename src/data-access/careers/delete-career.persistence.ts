import "server-only";

import { prisma } from "@/lib/prisma";

export async function deleteCareer(itemId: string): Promise<void> {
    await prisma.career.delete({ where: { id: itemId } })
}