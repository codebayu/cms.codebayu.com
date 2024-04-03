"use server";

import { updateCareer } from "@/data-access/careers/update-career.persistence";
import { getCareer } from "@/data-access/careers/get-career.persistence";
import { auth } from "@/lib/auth";
import { CreateItemState } from "@/types/actions";
import { ICareer } from "@/use-cases/careers/types";
import { updateCareerUseCase } from "@/use-cases/careers/update-career.use-case";
import { ValidationError } from "@/use-cases/careers/utils";
import { revalidatePath } from "next/cache";

export async function updateCareerAction(formData: ICareer): Promise<CreateItemState<ICareer>> {
    const { getUser } = await auth();
    try {
        await updateCareerUseCase({ getUser, updateCareer, getCareer }, { ...formData });
        revalidatePath("/career");
        return {
            form: { ...formData },
            status: "success",
        };
    } catch (err) {
        const error = err as Error;
        if (error instanceof ValidationError) {
            return {
                form: formData,
                status: "field-errors",
                errors: error.getErrors(),
            };
        } else {
            return {
                form: formData,
                status: "error",
                errors: error.message,
            };
        }
    }
}
