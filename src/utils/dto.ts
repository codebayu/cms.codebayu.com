import { ICareer } from "@/use-cases/careers/types";

export function toCareerDtoMapper(career: ICareer) {
    return {
        id: career.id,
        position: career.position,
        company: career.company,
        logo: career.logo,
        location: career.location,
        locationType: career.locationType,
        type: career.type,
        startDate: career.startDate,
        endDate: career.endDate,
        link: career.link,
        slug: career.slug
    }
}