import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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

  async login(dto: { email: string; password: string }): Promise<{ token: string; user: UserPublic }> {
    const { email, password } = dto;

    if (!email || !password) {
      throw new AppError("Missing required fields: email and password are required.", 400);
    }

    const user = await this.userRepository.findByEmail(email.trim().toLowerCase());
    if (!user) {
      throw new AppError("Invalid credentials.", 401);
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new AppError("Invalid credentials.", 401);
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new AppError("JWT_SECRET is not configured.", 500);
    }

    const expiresIn = process.env.JWT_EXPIRES_IN ?? "7d";

    const token = jwt.sign({ userId: user.id, email: user.email }, secret, { expiresIn } as jwt.SignOptions);

    const { passwordHash: _, ...publicUser } = user;
    return { token, user: publicUser as UserPublic };
  }

  async getMe(userId: string): Promise<UserPublic> {
    if (!userId) {
      throw new AppError("Unauthorized.", 401);
    }
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found.", 404);
    }
    const { passwordHash: _, ...publicUser } = user;
    return publicUser as UserPublic;
  }
}
