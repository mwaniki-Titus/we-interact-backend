import express from 'express';
import { createCommentController, deleteCommentController, getAllCommentsController, getSingleCommentController, getPostCommentController, updateCommentControllers, updateContentControllers } from '../controllers/commentController.js';
// import { authMiddleware } from '../middlewares/userAuthMiddleware.js';

const commentRouter=express.Router();

commentRouter.post('/comments', createCommentController);

commentRouter.get("/comments", getAllCommentsController);

commentRouter.get('/comments/single/:CommentID', getSingleCommentController);

commentRouter.get('/comments/post/:PostID', getPostCommentController);

commentRouter.patch('/comments/patch/:CommentID', updateContentControllers);

commentRouter.delete('/comments/delete/:CommentID', deleteCommentController);


export default commentRouter;