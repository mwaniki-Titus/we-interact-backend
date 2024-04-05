import { poolRequest, sql } from "../utils/dbConnect.js"
import { sendServerError, sendNotFound, sendDeleteSuccess} from "../helpers/helperFunctions.js";

// Create a ne video
export const addVideoService = async (newVideo) => {
    try {
        
        //Add the video querry
        const addVideoQuery = `
        INSERT INTO Video (videoID, UserID, videoURL,videoCaption, UploadDate)
        VALUES (@videoID, @UserID, @VideoURL,@videoCaption, @UploadDate)`

        //Picking input from the input
        const result = await poolRequest()
        .input("videoID", sql.VarChar, newVideo.videoID)
        .input("UserID", sql.VarChar, newVideo.UserID)
        .input("videoURL", sql.VarChar, newVideo.videoURL)
        .input("videoCaption", sql.VarChar, newVideo.videoCaption)
        .input("UploadDate", sql.DateTime, newVideo.UploadDate)
        .query(addVideoQuery)

        return result;

    } catch (error) {
        return error;
    }
};

//Fetch all the videos
export const getAllVideoService = async () => {
    try {
        const result = await poolRequest().query(`SELECT * FROM Video`)
        return result;
    } catch (error) {
        return error;
    }
};

//Ferch one video by videoID
export const getOneVideoService = async (videoID) => {
    try {
        const result = await poolRequest()
        .input("videoID",sql.VarChar(255),videoID)
        .query(`SELECT * FROM Video WHERE videoID = @videoID`);
        return result.recordset;
    } catch (error) {
        return error;
    }
};

//Ferch one video by videoID
export const getUserVideoService = async (UserID) => {
    try {
        const result = await poolRequest()
        .input("UserID",sql.VarChar(255),UserID)
        .query(`SELECT * FROM Video WHERE UserID = @UserID`);
        return result.recordset;
    } catch (error) {
        return error;
    }
};

//Delete a video by videoID
export const deleteVideoService = async (videoID) => {
    try {
        const response = await poolRequest()
        .input("videoID", sql.VarChar(255), videoID)
        .query("DELETE FROM Video WHERE videoID = @videoID");
        return response;
    } catch (error) {
        return error
    }
};