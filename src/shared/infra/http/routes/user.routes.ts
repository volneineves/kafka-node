import { Router } from "express";

import { CreateUserController } from "../../../../modules/users/useCases/createUser/controller/CreateUserController";
import { GetUsersController } from "../../../../modules/users/useCases/getUsers/GetUsersController";

const userRoutes = Router();

const createUserController = new CreateUserController();
const getUsersController = new GetUsersController();

userRoutes.post("", createUserController.handle);
userRoutes.get("", getUsersController.handle);
export { userRoutes };
