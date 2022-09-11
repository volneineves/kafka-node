import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserService } from "../service/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const service = container.resolve(CreateUserService);
    const user = await service.executeKafka(name, email);

    return response.status(201).json(user).send();
  }
}

export { CreateUserController };
