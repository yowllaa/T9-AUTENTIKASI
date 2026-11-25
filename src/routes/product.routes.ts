import { Router } from "express";
import * as controller from "../controller/product.controller";
import { butuhLogin } from "../middleware/auth.middleware";

const router = Router();
router.get("/", controller.list);
router.get("/:id", controller.detail);
router.post("/", butuhLogin, controller.create);
router.patch("/:id", butuhLogin, controller.update);
router.delete("/:id", butuhLogin, controller.remove);
export default router;
