import { PrismaClient, Users } from "@prisma/client";

import { IUsersRepository } from "../IUsersRepository";

const prisma = new PrismaClient();

class UsersRepository implements IUsersRepository {
  async findAll(): Promise<Users[]> {
    return await prisma.users.findMany();
  }

  async existByEmail(email: string): Promise<boolean> {
  
    const userCount = await prisma.users.count({
      where: {
        email
      },
    })

    return userCount > 0;
  };
  
  async create(id: string, name: string, email: string): Promise<Users> {
    return await prisma.users.create({
      data: {
        id: id,
        name,
        email,
      },
    });
  }
}

export { UsersRepository };
