import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getCareers = (): Prisma.CareerCreateInput[] => [
  {
    position: 'Software Engineer',
    company: 'Google',
    logo: 'google.png',
    location: 'Jakarta',
    locationType: 'remote',
    type: 'full-time',
    startDate: new Date(),
    endDate: new Date(),
    link: 'www.google.com',
    slug: 'google',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const main = async () => {
  await Promise.all(getCareers().map(career => prisma.career.create({ data: career })))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
