import {Router} from 'express';
import { deleteNotificationController, getAllNotificationsController, getAllUserNotificationsController, updateNotificationsController } from '../controllers/notificationsControllers.js';

const notificationRouter=Router();


notificationRouter.get('/notifications', getAllNotificationsController )

notificationRouter.get('/notifications/user/:UserID', getAllUserNotificationsController )
notificationRouter.patch('/notifications/:NotificationID', updateNotificationsController )
notificationRouter.delete('/notifications/:NotificationID/:UserID', deleteNotificationController )


export default notificationRouter;