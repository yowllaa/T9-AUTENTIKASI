import prisma from "../prisma";

export const findUserByEmail = (email: string) =>
  prisma.user.findUnique({ where: { email } });

export const findUserById = (id: number) =>
  prisma.user.findUnique({ where: { id }, select: { id: true, email: true, createdAt: true } });

export const createUser = (email: string, passwordHash: string) =>
  prisma.user.create({
    data: { email, passwordHash },
    select: { id: true, email: true, createdAt: true },
  });
