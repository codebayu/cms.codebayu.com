import { CareerEntity } from "@/entities/career";
import { ICareer, ICreateCareerDto } from "./types";

export class AuthenticationError extends Error {
    constructor() {
        super("You must be authenticated to do this action");
    }
}

export class ValidationError extends Error {
    private errors: Record<string, string | undefined>;

    constructor(errors: Record<string, string | undefined>) {
        super("An validation error occured");
        this.errors = errors;
    }

    getErrors() {
        return this.errors;
    }
}

export function careerToCreateCareerDtoMapper(career: CareerEntity): ICreateCareerDto {
    return {
        position: career.getPosition(),
        company: career.getCompany(),
        logo: career.getLogo(),
        location: career.getLocation(),
        locationType: career.getLocationType(),
        type: career.getType(),
        startDate: career.getStartDate(),
        endDate: career.getEndDate(),
        link: career.getLink(),
        slug: career.getSlug()
    }
}

export function careerToDto(career: CareerEntity): ICareer {
    const careerId = career.getId()

    if (!careerId) {
        throw new Error('dto: expected career to have an id');
    }

    return {
        id: careerId,
        position: career.getPosition(),
        company: career.getCompany(),
        logo: career.getLogo(),
        location: career.getLocation(),
        locationType: career.getLocationType(),
        type: career.getType(),
        startDate: career.getStartDate(),
        endDate: career.getEndDate(),
        link: career.getLink(),
        slug: career.getSlug()
    }
}