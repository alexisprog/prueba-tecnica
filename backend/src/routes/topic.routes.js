import Router from "express-promise-router";
import {
  getTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
} from "../controllers/topic.controller.js";
const router = Router();

router.get("/", getTopics);
router.get("/:id", getTopicById);
router.post("/", createTopic);
router.put("/", updateTopic);
router.delete("/:id", deleteTopic);

export default router;
