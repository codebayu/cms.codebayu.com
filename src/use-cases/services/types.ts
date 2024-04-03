export type IService = {
    id?: string
    title: string
    description: string
    tag: string
}

export type ICreateServiceDto = {
    title: string
    description: string
    tag: string
}

export type CreateService = (career: ICreateServiceDto) => void;
export type DeleteService = (careerId: string) => void;
export type UpdateService = (career: IService) => void;
export type GetService = (careerId: string) => Promise<IService>;
