import { Router } from "express";
import * as SecurityController from "../Controller/SecurityController.js";
import * as userValidator from "../Validator/userValidator.js";
import { validateReq } from "../Middleware/validateReqMiddleware.js";
import { authCheck } from "../Middleware/authMiddleware.js";

const router = Router();

router.post(
  "/register",
  validateReq(userValidator.registerSchema),
  SecurityController.register
);

router.post(
  "/login",
  validateReq(userValidator.loginSchema),
  SecurityController.login
);

router.get("/check", authCheck, SecurityController.check);

router.get("/logout", authCheck, SecurityController.logout);

export default router;
