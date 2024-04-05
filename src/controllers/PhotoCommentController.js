import {v4} from 'uuid'
import {  sendCreated, sendServerError} from "../helpers/helperFunctions.js"
import { createPhotoCommentService, getPhotoCommentService} from '../services/PhotoCommentService.js';
import {createPhotoCommentValidator} from '../validators/PhotoCommentValidator.js'


export const createPhotoComment = async (req, res) => {
    try {

      const {UserID,PhotoID,Content } = req.body;
      console.log(req.body);

      const CommentID = v4();
      const { error } = createPhotoCommentValidator({ Content });
      console.log("error",error);
      if (error) {
        return res.status(400).send(error.details[0].message);
      } else {
          
        const createdComment = {CommentID, UserID, PhotoID,Content};
  
        const result = await createPhotoCommentService(createdComment);

        console.log(result);
  
        if (result.message) {
          sendServerError(res, result.message)
      } else {
          sendCreated(res, 'comment created successfully');
      }
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
}


export const getPhotoComment = async (req, res) => {
  try {
      const {PhotoID}=req.params
      const data = await getPhotoCommentService(PhotoID);
      console.log("data",data);
      
      if (data.recordset) {
          return res.status(200).json(data.recordset);
         
      } else {
          return sendNotFound(res, 'Photos not found');
      }
  } catch (error) {
   
      sendServerError(res, 'Server error');
  }
}

