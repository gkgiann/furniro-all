import { api } from "@/lib/axios";
import type { AuthResponse, AuthUser } from "@/types/auth";

export async function register(dto: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthUser> {
  const res = await api.post<AuthUser>("/auth/register", dto);
  return res.data;
}

export async function login(dto: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/auth/login", dto);
  return res.data;
}

export async function getMe(): Promise<AuthUser> {
  const res = await api.get<AuthUser>("/auth/me");
  return res.data;
}
