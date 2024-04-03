import { ServiceEntity, ServiceEntityValidationError } from "@/entities/service";
import { CreateService, ICreateServiceDto } from "./types";
import { serviceToCreateCareerDtoMapper } from "./utils";
import { GetUser } from "../users/types";
import { AuthenticationError, ValidationError } from "@/utils/error";

export async function createServiceUseCase(
    context: {
        getUser: GetUser,
        createService: CreateService,
    },
    data: ICreateServiceDto) {

    const user = context.getUser()

    if (!user) {
        throw new AuthenticationError()
    }

    try {
        const newService = new ServiceEntity({
            title: data.title,
            description: data.description,
            tag: data.tag
        })
        await context.createService(serviceToCreateCareerDtoMapper(newService))
    } catch (err) {
        const error = err as ServiceEntityValidationError
        throw new ValidationError(error.getErrors());
    }
}