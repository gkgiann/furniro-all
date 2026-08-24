import bcrypt from "bcryptjs";
import AppError from "../exceptions/appError";
import { UserCreateDTO, UserPublic } from "../model/user";
import { PrismaUserRepository } from "../repositories/prismaUserRepository";

export default class AuthService {
  constructor(private userRepository: PrismaUserRepository) {}

  async register(dto: UserCreateDTO): Promise<UserPublic> {
    const { name, email, password } = dto;

    if (!name || !email || !password) {
      throw new AppError("Missing required fields: name, email, and password are required.", 400);
    }

    const emailTrimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      throw new AppError("Invalid email format.", 400);
    }

    if (password.length < 6) {
      throw new AppError("Password must be at least 6 characters.", 400);
    }

    const existing = await this.userRepository.findByEmail(emailTrimmed.toLowerCase());
    if (existing) {
      throw new AppError("Email already in use.", 409);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      name: name.trim(),
      email: emailTrimmed.toLowerCase(),
      passwordHash,
    });

    const { passwordHash: _, ...publicUser } = user;
    return publicUser as UserPublic;
  }
}
