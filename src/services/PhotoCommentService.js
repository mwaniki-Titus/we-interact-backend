import dotenv from "dotenv";

import { poolRequest, sql } from "../utils/dbConnect.js";

dotenv.config();


export const createPhotoCommentService = async (comment) => {
  try {
    const result = await poolRequest()
      .input("CommentID", sql.VarChar, comment.CommentID)
      .input("UserID", sql.VarChar, comment.UserID)
      .input("PhotoID", sql.VarChar, comment.PhotoID)
      .input("Content", sql.VarChar, comment.Content)
     
      .query(
        "INSERT INTO PhotoComments (CommentID, UserID, PhotoID, content) VALUES (@CommentID, @UserID, @PhotoID, @Content)"
      );
    console.log("results", result);
    return result;
  } catch (error) {
    return error;
  }
};


export const getPhotoCommentService = async (PhotoID) => {
  try {
      const result = await poolRequest()
      .input("PhotID", sql.VarChar, PhotoID)
      .query(`SELECT * FROM PhotoComments WHERE PhotID=@PhotoID`);
      
      return result;
  } catch (error) {
      throw error;
  }
};

