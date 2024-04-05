
import dotenv from 'dotenv'

import {poolRequest,sql} from '../utils/dbConnect.js'

dotenv.config();


export const getAllUserNotificationsService = async (UserID) => {
    try {
      const result = await poolRequest()
        .input('UserID', sql.VarChar, UserID)
        .query(`
          SELECT Notifications.*, tbl_user.*
          FROM Notifications
          INNER JOIN tbl_user ON tbl_user.userID = Notifications.UserID
          WHERE Notifications.UserID = @UserID
        `);
  
      console.log("result records", result.recordset);
      console.log("result", result);
      return result;
    } catch (error) {
      return error;
    }
  };
  
export const updateNotificationService=async(updateNotication)=>{
const updatedNotification=await poolRequest()
.input("NotificationID",sql.Int, updateNotication.NotificationID)
.input("is_read",sql.Bit, updateNotication.is_read)
.query(`UPDATE Notifications SET is_read=@is_read where NotificationID=@NotificationID`)
console.log("updatedNotification",updatedNotification);
return updatedNotification
  }

  // Username
  export const getAllNotificationsService=async()=>{
    try {
        const allNotifications=await poolRequest().query(`SELECT Notifications.*, tbl_user.*
          FROM Notifications
          INNER JOIN tbl_user ON tbl_user.UserID = Notifications.UserID`)
        return allNotifications
    } catch (error) {
        return error
    }
}



export const getAllSingleNotificationsService = async (NotificationID) => {
  try {
    const result = await poolRequest()
      .input('NotificationID', sql.Int, NotificationID)
      .query(`
        SELECT * FROM Notifications WHERE NotificationID = @NotificationID
      `);

    console.log("result", result);
    return result;
  } catch (error) {
    return error;
  }
};


export const deleteNotificationService = async (deleteNotication) => {
  try {
    const deletedNotification = await poolRequest()
      .input('UserID', sql.VarChar, deleteNotication.UserID)
      .input('NotificationID', sql.Int, deleteNotication.NotificationID)
      .query(`DELETE FROM Notifications WHERE NotificationID=@NotificationID AND UserID=@UserID`);

    console.log("notification", deletedNotification);
    return deletedNotification;
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
};