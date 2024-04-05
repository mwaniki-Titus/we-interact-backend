import { poolRequest, sql } from "../utils/dbConnect.js"; 
import { sendServerError, sendNotFound, sendDeleteSuccess, sendBadRequest, sendCreated } from "../helpers/helperFunctions.js";

//New like
export const addLikeService = async (newLike) => {
    try {
        const addLikeQuery = `INSERT INTO tbl_like (LikeID, post_id, UserID, like_date) VALUES (@LikeID, @post_id, @UserID, @like_date)`;
        const result = await poolRequest()
            .input("LikeID", sql.VarChar, newLike.LikeID)
            .input("post_id", sql.VarChar, newLike.post_id)
            .input("UserID", sql.VarChar, newLike.UserID)
            .input("like_date", sql.DateTime, newLike.like_date)
            .query(addLikeQuery);
        console.log("results", result);
        return result;
    } catch (error) {
        console.error("Error in addLikeService:", error);
        throw error; // Re-throw the error to propagate it to the caller
    }
}

// Fetch all likes
export const getAllLikesService = async () => {
    try {
    const result = await poolRequest().query(`SELECT * FROM tbl_like`)

        console.log(result);
        return result;
    } catch (error) {
        return error;
    }
}

// Fetch one like by post_id
export const getOneLikeByPIdService = async (post_id) => {
    try {
        const result = await poolRequest()
        .input("post_id", sql.VarChar(255), post_id)
        .query(`SELECT * FROM tbl_like WHERE post_id = @post_id`);
        return result.recordset;
    } catch (error) {
        return error;
    }
}

// Fetch one like by UserID
export const getOneLikeByUIdService = async (UserID) => {
    try {
        const result = await poolRequest()
        .input("UserID", sql.VarChar(255), UserID)
        .query(`SELECT * FROM tbl_like WHERE UserID = @UserID`);
        return result.recordset;
    } catch (error) {
        return error;
    }
}

// Delete post
export const deleteLikeService = async (UserID) => {
    try {
        const response = await poolRequest()
        .input ("UserID", sql.VarChar(255), UserID)
        .query("DELETE FROM tbl_like WHERE UserID=@UserID");
        return response;
    } catch (error) {
        return error;
    }
};