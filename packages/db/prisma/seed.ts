import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();

const generateDataArray = (length: number, fieldGenerator: any) => {
  return Array.from({ length }).map(() => {
    return fieldGenerator();
  });
};

async function main() {
  const todos = generateDataArray(30, () => ({
    name: faker.lorem.word(),
    isDone: faker.datatype.boolean(),
    description: faker.lorem.sentences(),
  }));
  await prisma.todo.createMany({ data: todos });

  console.log("done!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
