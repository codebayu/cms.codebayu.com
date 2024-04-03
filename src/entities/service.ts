import { IService } from "@/use-cases/services/types";
import { ZodError, z } from "zod";
import { EntityValidationError } from "./utils";

type ValidatedFields = "tag" | "title" | "description";

export class ServiceEntityValidationError extends EntityValidationError<ValidatedFields> { }

export const serviceSchema = z.object({
    tag: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
})

export class ServiceEntity {
    private id?: string
    private tag: string
    private title: string
    private description: string

    constructor({
        id,
        tag,
        title,
        description
    }: IService) {

        this.id = id
        this.tag = tag
        this.title = title
        this.description = description

        this.validate()
    }

    getId() {
        return this.id
    }

    getTag() {
        return this.tag
    }

    getTitle() {
        return this.title
    }

    getDescription() {
        return this.description
    }

    private validate() {

        try {
            serviceSchema.parse(this)
        } catch (err) {
            const error = err as ZodError;
            const errors = error.flatten().fieldErrors;
            throw new ServiceEntityValidationError({
                tag: errors.tag?.[0],
                title: errors.title?.[0],
                description: errors.description?.[0],
            });
        }
    }
}