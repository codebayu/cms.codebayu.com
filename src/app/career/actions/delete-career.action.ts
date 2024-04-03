"use server";;

import { deleteCareer } from "@/data-access/careers/delete-career.persistence";
import { auth } from "@/lib/auth";
import { CreateItemState } from "@/types/actions";
import { deleteCareerUseCase } from "@/use-cases/careers/delete-career.use-case";
import { revalidatePath } from "next/cache";

export async function deleteCareerAction(careerId: string): Promise<CreateItemState<{ careerId: string }>> {
    const { getUser } = await auth();
    try {
        await deleteCareerUseCase({ getUser, deleteCareer }, { careerId });
        revalidatePath("/career");
        return {
            form: { careerId },
            status: "success",
        };
    } catch (err) {
        const error = err as Error;
        return {
            form: { careerId },
            status: "error",
            errors: error.message,
        };
    }
}
