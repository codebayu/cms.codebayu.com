import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

const getUsers = (): Prisma.UserCreateInput[] => [
    { email: 'bayu@gmail.com', name: 'bayu setiawan' }
]

const main = async () => {
    await Promise.all(getUsers().map(user => prisma.user.create({ data: user })))
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })