import Router from "express-promise-router";
import {
  getContents,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
} from "../controllers/content.controller.js";
const router = Router();

router.get("/", getContents);
router.get("/:id", getContentById);
router.post("/", createContent);
router.put("/", updateContent);
router.delete("/:id", deleteContent);

export default router;
