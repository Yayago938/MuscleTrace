const { PrismaClient } = require('@prisma/client');
const { PrismaPg } =require('@prisma/adapter-pg');
require ('dotenv/config');

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
})

async function main() {
//   const user = await prisma.User.create({
//     data: {
//       email: "test@example.com",
//       password: "password123",  
//     },
//   })

//   console.log("Created user:", user)
  
  const allUsers = await prisma.user.findMany()
  console.log("All Users:", allUsers)

}

main()