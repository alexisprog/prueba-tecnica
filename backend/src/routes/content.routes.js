import Router from "express-promise-router";
import {
  getContents,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
  uploadImage,
  upload,
} from "../controllers/content.controller.js";
import authMiddleware from "../middleware/index.js";
const router = Router();

router.get("/", getContents);
router.get("/:id", getContentById);
router.post("/", authMiddleware(["Admin", "Creator"]), createContent);
router.put("/:id", authMiddleware(["Admin", "Creator"]), updateContent);
router.delete("/:id", authMiddleware(["Admin", "Creator"]), deleteContent);
router.post("/upload", upload.single("image"), uploadImage);

export default router;
