import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Testing database connection...')
    try {
        const submission = await prisma.contactSubmission.create({
            data: {
                name: "Test User",
                email: "test@example.com",
                phone: "1234567890",
                serviceType: "residential",
                serviceLocation: "maryland",
                squareMeters: 100,
                addressDetails: "123 Test St",
            }
        })
        console.log('Successfully created submission:', submission)

        const count = await prisma.contactSubmission.count()
        console.log('Total submissions:', count)

    } catch (e) {
        console.error('Error:', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
