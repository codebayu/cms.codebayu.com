import { DeleteCareer, GetUser } from "./types";
import { AuthenticationError } from "./utils";

export async function deleteCareerUseCase(
    context: {
        getUser: GetUser,
        deleteCareer: DeleteCareer
    },
    data: { careerId: string }) {

    const user = context.getUser()

    if (!user) {
        throw new AuthenticationError()
    }

    await context.deleteCareer(data.careerId)
}