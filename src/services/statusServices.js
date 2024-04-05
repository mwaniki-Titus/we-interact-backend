
import logger from "../utils/Logger.js";
import { poolRequest, sql } from "../utils/dbConnect.js";

export const createStatusService = async (newStatus) => {
  try {
    const newCreatedStatus = await poolRequest()
      .input("UserID", sql.VarChar, newStatus.UserID)
      .input("StatusID", sql.VarChar, newStatus.StatusID)
      .input("StatusText", sql.VarChar, newStatus.StatusText)
      .input("ImagePath", sql.VarChar, newStatus.ImagePath)
      .input("CreatedAt", sql.DateTime, newStatus.CreatedAt)
      .query(
        "INSERT INTO Status(UserID,StatusID,StatusText,ImagePath,CreatedAt) VALUES(@UserID,@StatusID,@StatusText,@ImagePath,@CreatedAt)"
      );
    logger.info("new status service", newCreatedStatus);
    return newCreatedStatus;
  } catch (error) {
    logger.error("Error while creating status", error);
    return { error: "Invalid Credentials" };
  }
};



export const updateStatusService = async (updateStatus) => {
  console.log("upadte Status",updateStatus);
  try {
    const updatedStatus=await poolRequest()
    .input('StatusID', sql.VarChar,updateStatus.StatusID)
    .input('StatusText', sql.VarChar,updateStatus.StatusText)
    .input('ImagePath', sql.VarChar,updateStatus.ImagePath)
  .query(`UPDATE Status  SET StatusText = @StatusText, ImagePath = @ImagePath WHERE  StatusID = @StatusID  `)
console.log("updated",updateStatus);
  return updatedStatus
  
  } catch (error) {
    return error
  }
};




export const getSingleStatusServices=async(StatusID)=>{
  const singleStatus= await poolRequest()
  .input('StatusID', sql.VarChar,StatusID)
  .query('SELECT * FROM Status WHERE StatusID = @StatusID ')
  console.log('single Status',singleStatus);
  return singleStatus
}


export const getAllStatusService = async () => {
  try {
    const allStatus = await poolRequest()
    .query(`SELECT Status.*, tbl_user.*
    FROM Status
    INNER JOIN tbl_user ON tbl_user.UserID = Status.UserID`);
    return allStatus;
  } catch (error) {
    return { error: "Invalid Credentials" };
  }
};

// Fetching delete user
export const deleteStatusServices=async(StatusID)=>{
  const deletedStatus= await poolRequest()
  .input('StatusID', sql.VarChar,StatusID)
  .query('DELETE FROM Status WHERE StatusID = @StatusID ')
  console.log(' yeah',deletedStatus.recordset);
  return deletedStatus.recordset;
}