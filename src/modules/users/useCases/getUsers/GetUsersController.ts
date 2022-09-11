import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetUsersService } from "./GetUsersService";

class GetUsersController {

  async handle(request: Request, response: Response): Promise<Response> {
    const  service = container.resolve(GetUsersService);

    const users = await service.execute();

    return response.status(200).json(users).send();
  }
}

export { GetUsersController };
