import { Router } from "express";
import { login, signup } from "../controllers/authController.js";
import { getProtectedMessage } from "../controllers/protectedController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/protected", requireAuth, getProtectedMessage);

export default router;