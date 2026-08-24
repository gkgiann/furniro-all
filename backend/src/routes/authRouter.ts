import { Router, Request, Response } from "express";
import authFactory from "../factories/authFactory";

const authRouter = Router();
const authController = authFactory.createController();

authRouter.post("/register", (req: Request, res: Response) => authController.register(req, res));

export default authRouter;
