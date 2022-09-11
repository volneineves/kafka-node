import { Users } from "@prisma/client";

interface IUsersRepository {
  findAll(): Promise<Users[]>;
  existByEmail(email: string): Promise<boolean>;
  create(
    id: string,
    name: string,
    email: string
  ): Promise<Users>;
}

export { IUsersRepository };
