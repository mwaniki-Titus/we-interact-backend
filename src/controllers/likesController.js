import { v4 } from "uuid";
import { addLikeService, getAllLikesService, getOneLikeByPIdService, getOneLikeByUIdService, deleteLikeService } from "../services/likesService.js";
import { likesValidator } from "../validators/likesValidator.js";
import { sendNotFound, sendServerError, sendCreated, sendBadRequest, sendDeleteSuccess } from "../helpers/helperFunctions.js";

// New like controller
export const addLike = async (req, res) => {
    const {UserID, post_id, like_date } = req.body;
    const {error} = likesValidator({UserID, post_id, like_date});
    if (error) {
        return sendServerError(res, error.message);
        
    } else {
        // console.log(error);
        try {
            const LikeID = v4();
            const like_date = new Date();
            const newLike = {LikeID, post_id, UserID, like_date };
            console.log("newlikecontent", newLike);
            const response = await addLikeService(newLike);
            console.log("newLike", response);
            if (response.message) {
                sendServerError(res, response.message);
            } else {
                sendCreated(res, "Liked!")
            }

        } catch (error) {
            sendServerError(res, error);
        }
        
    }
}

//fetch all likes
export const getAllLikes = async (req, res) => {
    try {
        const data = await getAllLikesService();
        if (!data.recordset) {
            return sendNotFound(res, "No likes found");
          }
        return res.status(200).json(data.recordset);
    } catch (error) {
        sendServerError(res, error)
    }
};

//fetch likes by uid
export const getOneLikeByPId = async (req, res) => {
    try {
        const { post_id } = req.params;
        const data = await getOneLikeByPIdService(post_id);
        if (data.length !==0) {
            return res.status(200).json(data[0]);
        } else {
            sendNotFound(res, "Like not found");
        }
    } catch (error) {
        sendServerError(res, error)
    }
};

//fetch likes by pid
export const getOneLikeByUId = async (req, res) => {
    try {
        const { UserID } = req.params;
        const data = await getOneLikeByUIdService(UserID);
        if (data.length !==0) {
            return res.status(200).json(data[0]);
        } else {
            sendNotFound(res, "Like not found");
        }
    } catch (error) {
        sendServerError(res, error)
    }
};

//deleting likes by user id
export const deleteLike = async (req, res) => {
    try {
        const { UserID} = req.params;
        const response = await deleteLikeService (UserID);
        if (response.rowsAffected == 1) {
            sendDeleteSuccess(res, "Unliked");
        }
    } catch (error) {
        sendServerError(res, error);
    }
}