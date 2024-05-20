import Router from "express-promise-router";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import authMiddleware from "../middleware/index.js";
const router = Router();

router.get("/", authMiddleware(["Admin"]), getCategories);
router.get("/:id", authMiddleware(["Admin"]), getCategoryById);
router.post("/", authMiddleware(["Admin"]), createCategory);
router.put("/", authMiddleware(["Admin"]), updateCategory);
router.delete("/:id", authMiddleware(["Admin"]), deleteCategory);

export default router;
