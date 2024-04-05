import {Router} from 'express';
import {createMessageController, deleteMessageController, getAllMessagesController, getMessageChatController, getSUserMessageController, getSUsersChatMessagesController, getSingleMessageController, updateContentControllers, updateMessageControllers} from '../controllers/messageControllers.js'

const messageRouter=Router();

// creating the message
messageRouter.post('/messages', createMessageController)

messageRouter.get('/messages', getAllMessagesController )

// getting chat message
messageRouter.get('/messages/:ChatID', getMessageChatController)


messageRouter.get('/messages/single/:MessageID', getSingleMessageController)

messageRouter.get('/messages/user/:UserID', getSUserMessageController)
messageRouter.get('/messages/user/:SenderID/:ReceiverID', getSUsersChatMessagesController)

messageRouter.put('/messages/update/:MessageID', updateMessageControllers)

messageRouter.patch('/messages/patch/:MessageID', updateContentControllers)

messageRouter.delete('/messages/delete/:MessageID', deleteMessageController)


export default messageRouter;

