import Router from "express-promise-router";
import {
  getTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
} from "../controllers/topic.controller.js";
import authMiddleware from "../middleware/index.js";
const router = Router();

router.get("/", getTopics);
router.get("/:id", getTopicById);
router.post("/", authMiddleware(["Admin"]), createTopic);
router.put("/", authMiddleware(["Admin"]), updateTopic);
router.delete("/:id", authMiddleware(["Admin"]), deleteTopic);

export default router;
