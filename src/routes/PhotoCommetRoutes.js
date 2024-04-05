import {Router} from 'express';
import { createPhotoComment, getPhotoComment} from '../controllers/PhotoCommentController.js';

const photoCommentRouter=Router();


photoCommentRouter.post('/photocomments', createPhotoComment)


photoCommentRouter.get('/comments/:PhotoID', getPhotoComment)




export default photoCommentRouter;