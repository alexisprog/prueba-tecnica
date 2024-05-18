import Router from "express-promise-router";
import { login, register } from "../controllers/auth.controller.js";
const router = Router();

router.post("/", login);
router.post("/register", register);

export default router;
