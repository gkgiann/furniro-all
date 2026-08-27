import { User } from "@prisma/client";
import { prisma as prismaClient } from "../lib/prisma";
import type { PrismaClient } from "@prisma/client";

export class PrismaUserRepository {
  constructor(private prisma: PrismaClient = prismaClient) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: { name: string; email: string; passwordHash: string }): Promise<User> {
    return this.prisma.user.create({ data });
  }
}
