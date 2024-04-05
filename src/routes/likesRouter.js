import express from "express";
import { addLike, getAllLikes, getOneLikeByPId, getOneLikeByUId, deleteLike } from "../controllers/likesController.js";

const router = express.Router();

router.post("/likes", addLike);
router.get("/likes", getAllLikes);
router.get("/likes/pid/:post_id", getOneLikeByPId)
router.get("/likes/uid/:UserID", getOneLikeByUId)
router.delete("/likes/:UserID", deleteLike)

export default router;