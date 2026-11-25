import { Router } from "express";
import * as controller from "../controller/auth.controller";
import { butuhLogin } from "../middleware/auth.middleware";

const router = Router();
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/saya", butuhLogin, controller.saya);
export default router;
