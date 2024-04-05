import { poolRequest, sql } from "../utils/dbConnect.js";

export const getPhotoService = async (UserID) => {
    try {
        const result = await poolRequest()
        .input("UserID", sql.VarChar, UserID)
        .query(`SELECT * FROM Photo WHERE UserID=@UserID`);
        
        return result;
    } catch (error) {
        throw error;
    }
};


export const createPhotoService = async (newPhoto) => {
    try {
        
        
    const checkPhotoQuery = `
        SELECT COUNT(*) AS count
        FROM Photo
        WHERE PhotoID = @PhotoID
      `;
  
      const checkPhotoResult = await poolRequest()
        .input("PhotoID", sql.VarChar, newPhoto.PhotoID)
        .query(checkPhotoQuery);
  
      if (checkPhotoResult.recordset[0].count > 0) {
        throw new Error('The photo already exists, please choose another one');
      }
  
      
      const addPhotoQuery = `
        INSERT INTO Photo (PhotoID, UserID, PhotoURL, UploadDate)
        VALUES (@PhotoID, @UserID, @PhotoURL, @UploadDate)
      `;
  
      const result = await poolRequest()
        .input("PhotoID", sql.VarChar, newPhoto.PhotoID)
        .input("UserID", sql.VarChar, newPhoto.UserID)
        .input("PhotoURL", sql.VarChar, newPhoto.PhotoURL)
        .input("UploadDate", sql.DateTime, newPhoto.UploadDate)
        .query(addPhotoQuery);
  
      return result;
    } catch (error) {
      return { message: error.message };
    }
  };


  

export const deletePhotoService = async (photoId) => {
    try {
        await poolRequest()
            .input('PhotoID', sql.Int, photoId)
            .query(`DELETE FROM Photo WHERE PHOTOID = @PhotoID`);
    } catch (error) {
        throw error;
    }
};
export const updatePhotoService = async (photoId, updatedPhoto) => {
    const { PhotoID, UserID, PhotoURL, UploadDate } = updatedPhoto;
    try {
        const result = await poolRequest()
            .input("PhotoID", sql.VarChar, PhotoID)
            .input("UserID", sql.VarChar, UserID)
            .input("PhotoURL", sql.VarChar, PhotoURL)
            .input("UploadDate", sql.DateTime, UploadDate)
            .input("PhotoId", sql.Int, photoId)
            .query(
                "UPDATE Photo SET PhotoID = @PhotoID, UserID = @UserID, PhotoURL = @PhotoURL, UploadDate = @UploadDate WHERE PHOTOID = @PhotoId"
            );

        return result;
    } catch (error) {
        console.error("Error occurred while updating photo:", error);
        throw new Error("Failed to update photo. Please try again later.");
    }
};


export const getPhotosByUserIDService = async (UserID) => {
  try {
    const result = await poolRequest()
      .input("UserID", sql.VarChar(255), UserID)
      .query("SELECT * FROM Photo WHERE UserID = @UserID");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};


export const getAllPhotosService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM Photo");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};