import { Request, Response, NextFunction } from "express";
import * as authService from "../service/auth.service";

export function butuhLogin(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Token diperlukan", code: "TOKEN_DIPERLUKAN" });
  }
  const token = header.slice(7).trim();
  if (!token) {
    return res.status(401).json({ success: false, message: "Token diperlukan", code: "TOKEN_DIPERLUKAN" });
  }
  try {
    const decoded = authService.verifyToken(token) as { id?: number; email?: string };
    if (!decoded || typeof decoded.id !== "number") {
      return res.status(401).json({ success: false, message: "Token tidak valid", code: "TOKEN_TIDAK_VALID" });
    }
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Token tidak valid atau sudah expired", code: "TOKEN_TIDAK_VALID" });
  }
}
