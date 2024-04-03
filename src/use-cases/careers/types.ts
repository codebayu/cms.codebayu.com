export type ICareer = {
    id?: string
    position: string
    company: string
    logo: string
    location: string
    locationType: string
    type: string
    startDate: Date
    endDate: Date
    link: string
    slug: string
}

export type ICreateCareerDto = {
    position: string
    company: string
    logo: string
    location: string
    locationType: string
    type: string
    startDate: Date
    endDate: Date
    link: string
    slug: string
}

export type User = {
    userId: string;
};

export type CreateCareer = (career: ICreateCareerDto) => void;
export type DeleteCareer = (careerId: string) => void;
export type UpdateCareer = (career: ICareer) => void;
export type GetUser = () => User | undefined;
export type GetCareer = (careerId: string) => Promise<ICareer>;
export type GetUserCareerByName = (
    userId: string,
    name: string
) => Promise<ICareer | undefined>;