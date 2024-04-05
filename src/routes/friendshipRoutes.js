import {Router} from 'express';
import { createFriendshipController, deleteFriendshipController, getAllFriendshipsController, getAllUserFriendshipsController, getSingleFriendshipController, updateFriendshipControllers } from '../controllers/friendshipControllers.js';

const friendshipRouter=Router();

friendshipRouter.post('/friendships', createFriendshipController)

friendshipRouter.get('/friendships',  getAllFriendshipsController)

friendshipRouter.get('/friendships/single/:FriendshipID',  getSingleFriendshipController)
friendshipRouter.get('/friendships/user/:User1ID', getAllUserFriendshipsController)

// friendshipRouter.put('/friendships/update/:FriendshipID', updateFriendshipControllers)

friendshipRouter.patch('/friendships/patch/:FriendshipID', updateFriendshipControllers)

friendshipRouter.delete('/friendships/delete/:FriendshipID',  deleteFriendshipController)


export default friendshipRouter;