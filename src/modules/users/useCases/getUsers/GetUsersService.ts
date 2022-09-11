import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class GetUsersService {
  constructor(
    @inject("UsersRepository")
    private repository: IUsersRepository // Alterar para IUserRepository
  ) {}

  async execute() {
    return await this.repository.findAll();
  }
}

export { GetUsersService };
