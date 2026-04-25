import prisma from './config/db'

async function main() {
  const user = await prisma.user.upsert({
    where: {
      email: 'samruddhi@example.com'
    },
    update: {
      name: 'Samruddhi',
      passwordHash: 'hashed_password_demo'
    },
    create: {
      name: 'Samruddhi',
      email: 'samruddhi@example.com',
      passwordHash: 'hashed_password_demo'
    }
  })

  const ticket = await prisma.ticket.create({
    data: {
      title: 'Login page issue',
      description: 'Unable to submit login form',
      status: 'open',
      priority: 'high',
      category: 'bug',
      createdById: user.id
    }
  })

  const comment = await prisma.comment.create({
    data: {
      content: 'Investigating this issue now',
      ticketId: ticket.id,
      userId: user.id
    }
  })

  console.log('User ready:', user)
  console.log('Ticket created:', ticket)
  console.log('Comment created:', comment)
}

main()
  .catch((error) => {
    console.error('Error inserting test rows:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })