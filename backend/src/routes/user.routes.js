import Router from "express-promise-router";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/index.js";
const router = Router();

router.get("/", authMiddleware(["Admin"]), getUsers);
router.get("/:id", getUserById);
router.post("/", authMiddleware(["Admin"]), createUser);
router.put("/", authMiddleware(["Admin", "Creator"]), updateUser);
router.delete("/:id", authMiddleware(["Admin"]), deleteUser);

export default router;
