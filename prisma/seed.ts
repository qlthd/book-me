import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            email: 'micheltest@gmail.com',
            firstName: 'Michel',
            lastName: 'Test',
            eventTypes: {
                create: [
                    {
                        title: '15-Minute Intro Call',
                        slug: 'intro-call-15',
                        duration: 15,
                        description: 'Quick intro meeting',
                    },
                ],
            },
            availability: {
                create: [
                    { date: new Date("2025-01-01"), startTime: '09:00', endTime: '12:00' },
                    { date: new Date("2025-01-02"), startTime: '13:00', endTime: '17:00' },
                ],
            },
        },
    })

    console.log(`Seeded user: ${user.email}`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
