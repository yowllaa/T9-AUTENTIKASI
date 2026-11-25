import { Request, Response, NextFunction } from "express";
import * as authService from "../service/auth.service";
import * as userData from "../data/user.data";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body ?? {};
    if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      return res.status(400).json({ success: false, message: "Email tidak valid" });
    }
    if (typeof password !== "string" || password.length < 8) {
      return res.status(400).json({ success: false, message: "Password minimal 8 karakter" });
    }
    const user = await authService.register(email, password);
    res.status(201).json({ success: true, message: "Registrasi berhasil", data: user });
  } catch (e) { next(e); }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body ?? {};
    if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
      return res.status(400).json({ success: false, message: "Email dan password wajib diisi" });
    }
    const result = await authService.login(email, password);
    res.json({ success: true, message: "Login berhasil", data: result });
  } catch (e) { next(e); }
};

export const saya = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userData.findUserById(req.user!.id);
    if (!user) return res.status(404).json({ success: false, message: "User tidak ditemukan" });
    res.json({ success: true, data: user });
  } catch (e) { next(e); }
};
