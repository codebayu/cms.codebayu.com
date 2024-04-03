import { ServiceEntity } from "@/entities/service";
import { IService, ICreateServiceDto } from "./types";

export function serviceToCreateCareerDtoMapper(service: ServiceEntity): ICreateServiceDto {
    return {
        title: service.getTitle(),
        description: service.getDescription(),
        tag: service.getTag()
    }
}

export function serviceToDto(service: ServiceEntity): IService {
    const serviceId = service.getId()

    if (!serviceId) {
        throw new Error('dto: expected career to have an id');
    }

    return {
        id: serviceId,
        title: service.getTitle(),
        description: service.getDescription(),
        tag: service.getTag()
    }
}