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
}
