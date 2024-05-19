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
const router = Router();

router.get("/", getContents);
router.get("/:id", getContentById);
router.post("/", createContent);
router.put("/:id", updateContent);
router.delete("/:id", deleteContent);
router.post("/upload", upload.single("image"), uploadImage);

export default router;
