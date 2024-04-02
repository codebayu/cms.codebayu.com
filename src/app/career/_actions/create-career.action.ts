"use server";


import { createCareer } from "@/data-access/careers/create-career.persistence";
import { auth } from "@/lib/auth";
import { createCareerUseCase } from "@/use-cases/careers/create-career.use-case";
import { ICreateCareerDto } from "@/use-cases/careers/types";
import { ValidationError } from "@/use-cases/careers/utils";
import { revalidatePath } from "next/cache";

type FieldErrorsState = {
    status: "field-errors";
    errors: Partial<Record<keyof ICreateCareerDto, string>>;
};

type DefaultState = {
    status: "default";
};

type SubmitErrorState = {
    status: "error";
    errors: string;
};

type SuccessState = {
    status: "success";
};

type CreateItemState = { form: ICreateCareerDto } & (
    | SuccessState
    | SubmitErrorState
    | FieldErrorsState
    | DefaultState
);

export async function createCareerAction(formData: ICreateCareerDto): Promise<CreateItemState> {
    const { getUser } = await auth();
    try {
        await createCareerUseCase({ getUser, createCareer }, { ...formData });
        revalidatePath("/");
        return {
            form: {
                position: '',
                company: '',
                link: '',
                location: '',
                locationType: '',
                type: '',
                startDate: new Date(),
                endDate: new Date(),
                slug: '',
                logo: '',
            },
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
