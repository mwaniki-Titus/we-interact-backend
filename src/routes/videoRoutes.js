import express from "express";
import { addVideo, getAllVideos, getOneVideoPost, getUserVideoPost, deleteVideo } from "../controllers/videoController.js";

const router = express.Router();

// Add new video
router.post("/video", addVideo);
router.get("/video", getAllVideos);
router.get("/video/vid/:videoID", getOneVideoPost);
router.get("/video/uid/:UserID", getUserVideoPost);
router.delete("/video/vid/:videoID", deleteVideo)

export default router;