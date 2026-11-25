import express, { Request, Response, NextFunction } from "express";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => res.json({
  success: true,
  message: "Welcome to Stockify API",
  endpoints: ["/auth/register", "/auth/login", "/auth/saya", "/api/categories", "/api/products"]
}));

app.use("/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use((_req: Request, res: Response) => res.status(404).json({ success: false, message: "Route not found" }));
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  if (err?.status) return res.status(err.status).json({ success: false, message: err.message, code: err.code });
  if (err?.code === "P2002") return res.status(409).json({ success: false, message: "Duplicate value (email, name, or SKU)", code: "DUPLIKAT" });
  if (err?.code === "P2003") return res.status(400).json({ success: false, message: "Related data constraint error", code: "DATA_RELATION" });
  if (err?.code === "P2025") return res.status(404).json({ success: false, message: "Data not found", code: "DATA_TIDAK_DITEMUKAN" });
  res.status(500).json({ success: false, message: "Internal server error", code: "INTERNAL_ERROR" });
});
export default app;
