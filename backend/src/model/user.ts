import { User } from "@prisma/client";

export type { User } from "@prisma/client";

export type UserCreateDTO = {
  name: string;
  email: string;
  password: string;
};

export type UserPublic = Omit<User, "passwordHash">;
