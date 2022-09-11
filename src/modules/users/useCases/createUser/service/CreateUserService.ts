import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { Users } from "@prisma/client";

import { v4 as uuidV4 } from "uuid";
import { CreateUserProducer } from "../messaging/CreateUserProducer";

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private repository: IUsersRepository,
    @inject("CreateUserProducer")
    private producer: CreateUserProducer // TODO Deixar mais genérico
  ) {}

  // Publica o usuário serializado como um tópico no KAFKA
  async executeKafka(name: string, email: string) {
    await this.validateIfEmailAlreadyExist(email)
    const user: Users = { id: uuidV4(), name, email };
    this.producer.registerUser(user);
    return user;
  }

  // Recebe do Consumer do KAFKA um usuário deserializado.
  async executeRepository(user: Users) {
    const { id, name, email } = user;
    await this.repository.create(id, name, email);
  }

  private async validateIfEmailAlreadyExist(email: string) {
    const emailExist = await this.repository.existByEmail(email);
    if (emailExist) throw new Error(`The email: ${email} already exist`);
  }
}

export { CreateUserService };
