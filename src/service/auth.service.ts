import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userData from "../data/user.data";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET harus diisi minimal 32 karakter di file .env");
}

export async function register(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  if (await userData.findUserByEmail(normalizedEmail)) {
    const error: any = new Error("Email sudah terdaftar");
    error.status = 409;
    error.code = "EMAIL_DUPLIKAT";
    throw error;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  return userData.createUser(normalizedEmail, passwordHash);
}

export async function login(email: string, password: string) {
  const user = await userData.findUserByEmail(email.trim().toLowerCase());
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    const error: any = new Error("Email atau password salah");
    error.status = 401;
    error.code = "LOGIN_GAGAL";
    throw error;
  }
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "2h" });
  return { user: { id: user.id, email: user.email }, token };
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
