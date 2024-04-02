export type ICareer = {
    id: string
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
export type DeleteCareer = (careerId: number) => void;
export type UpdateCareer = (career: ICareer) => void;
export type GetUser = () => User | undefined;
export type GetCareer = (careerId: number) => Promise<ICareer>;
export type GetUserCareerByName = (
    userId: string,
    name: string
) => Promise<ICareer | undefined>;