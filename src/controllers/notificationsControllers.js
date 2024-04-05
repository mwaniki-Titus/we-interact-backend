import { deleteNotificationService, getAllNotificationsService, getAllSingleNotificationsService, getAllUserNotificationsService, updateNotificationService } from "../services/notificationsService.js";



export const getAllUserNotificationsController = async (req, res) => {
    try {
      const {UserID}=req.params
      console.log(UserID);
      const results = await getAllUserNotificationsService(UserID)
      console.log(results);
       if(results.rowsAffected>0){
        const notifications=results.recordset
        console.log("notifications",notifications);
      res.status(200).json( notifications );
       }else{
        return res.status(400).send({message: "No existing notifications"});
       }
    } catch (error) {
      console.error("Error fetching all notifications:", error);
      res.status(500).json("Internal server error");
    }
  };


  export const getAllNotificationsController = async (req, res) => {
    try {
      const results = await getAllNotificationsService()
       if(results.rowsAffected>0){
        const Notifications=results.recordset
        res.status(200).json( Notifications );
       }else{
        res.status(400).json({ message: "No Notifications" });
       }
    } catch (error) {
      console.error("Error fetching all Notifications:", error);
      res.status(500).json("Internal server error");
    }
  };
  export const updateNotificationsController = async (req, res) => {
    try {
      const {is_read}=req.body
      const {NotificationID}=req.params
      console.log(NotificationID);
      const results = await updateNotificationService({NotificationID,is_read})
      console.log(results);
       if(results.rowsAffected>0){
      res.status(200).json( "Notification has been read" );
       }else{
        return res.status(400).send({message: "No existing notifications"});
       }
    } catch (error) {
      console.error("Error updating the notifications:", error);
      res.status(500).json("Internal server error");
    }
  };
  
  export const deleteNotificationController=async(req,res)=>{
    try {
      
      const {UserID,NotificationID}=req.params
      console.log(req.params);
      const existingNotification=await getAllSingleNotificationsService(NotificationID)
      if(existingNotification.rowsAffected>0){
  const result=await deleteNotificationService({UserID,NotificationID})
      console.log("deletedNotifications",result.rowsAffected);
      if(result.rowsAffected>0){
        return res.status(200).json("Deleted successfully")
      }else{
        return res.status(400).json("Failed to delete the notification")
      }
      }else{
        return res.status(400).json("The notification does not exist")
      }
    
    } catch (error) {
      
    }
  }