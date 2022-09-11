import { container } from "tsyringe";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/users/repositories/prisma/UsersRepository";
import { CreateUserProducer } from "../../modules/users/useCases/createUser/messaging/CreateUserProducer";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<CreateUserProducer>(
  "CreateUserProducer",
  CreateUserProducer
);
