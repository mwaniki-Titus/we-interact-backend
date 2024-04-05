import { v4 } from "uuid";

//Video service
import { addVideoService, getOneVideoService, getUserVideoService, deleteVideoService, getAllVideoService } from "../services/videoService.js";

//Video validator
import { videoValidator } from "../validators/videoValidator.js";

//Helper functions
import { sendBadRequest, sendClientError, sendCreated, sendNotFound, sendDeleteSuccess, sendServerError } from "../helpers/helperFunctions.js";
import { getOneVideoPostService } from "../services/postServices.js";

//Creating a new video
export const addVideo = async (req, res) => {
    const { UserID, videoURL, videoCaption, UploadDate } = req.body;
    const {error} = videoValidator({ UserID, videoURL, videoCaption, UploadDate });
    if (error) {
        return sendServerError(res, error.message);
    } else {
        try {
            const videoID = v4();
            const UploadDate = new Date();
            const newVideo = {videoID, UserID, videoURL, videoCaption, UploadDate}
            const response = await addVideoService(newVideo);
            if (response.message) {
                sendServerError(res, response.message);
            } else {
                sendCreated(res, "Video uploaded and post created successfully")
            }
        } catch (error) {
            sendServerError(res, error.message);
        }
    }
};

//Fetch all the videos
export const getAllVideos = async (req, res) => {
    try {
        const data = await getAllVideoService()
        if (!data.recordset) {
            return sendNotFound(res, "No videos found")
        }
        return res.status(200).json(data.recordset);
    } catch (error) {
        sendServerError(res, error);
    }
}

//Ferch one video by videoID
export const getOneVideoPost = async (req, res) => {
    try {
        const {videoID} = req.params;
        const data = await getOneVideoService(videoID);
        if (data.length !==0) {
            return res.status(200).json(data[0]);
        } else {
            sendNotFound(res, "The requested video not found")
        }
    } catch (error) {
        sendServerError(res, error)
    }
};

//Ferch one video by videoID
export const getUserVideoPost = async (req, res) => {
    try {
        const {UserID} = req.params;
        const data = await getUserVideoService(UserID);
        if (data.length !==0) {
            return res.status(200).json(data);
        } else {
            sendNotFound(res, "No posts available, try to add a new one below.")
        }
    } catch (error) {
        sendServerError(res, error)
    }
};

//Delete a video by videoID
export const deleteVideo = async (req, res) => {
    try {
        const {videoID} = req.params;
        const response = await deleteVideoService(videoID);
        if (response.rowsAffected == 1) {
            sendDeleteSuccess(res, "Video deleted successfully")
        }
    } catch (error) {
        sendServerError(res, error);
    }
};