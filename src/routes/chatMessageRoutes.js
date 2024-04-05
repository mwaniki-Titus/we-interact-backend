import {Router} from 'express';
import { createChatController, deleteChatController, getAllChatsController, getSUsersChatController, getSingleChatController, getUserChatController, updateChatControllers } from '../controllers/chatMessageControllers.js';

const chatRouter=Router();

chatRouter.post('/chats', createChatController)

chatRouter.get('/chats', getAllChatsController )

chatRouter.get('/chats/single/:ChatID', getSingleChatController)

chatRouter.get('/chats/user/:UserID', getUserChatController)
chatRouter.get('/chats/user/:SenderID/:ReceiverID', getSUsersChatController)

chatRouter.put('/chats/update/:ChatID', updateChatControllers)


chatRouter.delete('/chats/delete/:ChatID', deleteChatController)


export default chatRouter;