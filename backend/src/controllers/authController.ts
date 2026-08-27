import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserCreateDTO } from "../model/user";
import AuthService from "../services/authService";

export default class AuthController {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response) {
    const dto = req.body as UserCreateDTO;
    const user = await this.authService.register(dto);
    res.status(StatusCodes.CREATED).send(user);
  }

  async login(req: Request, res: Response) {
    const dto = req.body as { email: string; password: string };
    const result = await this.authService.login(dto);
    res.status(StatusCodes.OK).send(result);
  }

  async me(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) throw new Error("Unauthorized.");
    const user = await this.authService.getMe(userId);
    res.status(StatusCodes.OK).send(user);
  }
}
