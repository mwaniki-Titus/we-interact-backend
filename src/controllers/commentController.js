import {v4} from 'uuid'
import { notAuthorized, sendCreated, sendDeleteSuccess, sendNotFound, sendServerError} from "../helpers/helperFunctions.js"
import { createCommentService, deleteCommentServices, getAllCommentsService, getSingleCommentServices, getPostCommentServices, updateCommentService, updateContentService } from '../services/commentService.js';
import { createCommentValidator, updateCommentValidator, updateContentValidator } from '../validators/commentValidator.js';

//New comment
export const createCommentController = async (req, res) => {
    try {

      const {UserID,PostID,Content } = req.body;
      console.log(req.body);

      const CommentID = v4();
      const { error } = createCommentValidator({ Content });
      console.log("error",error);
      if (error) {
        return res.status(400).send(error.details[0].message);
      } else {
        const CommentDate = new Date();    
        const createdComment = { CommentID,UserID, PostID,Content,CommentDate};
  
        const result = await createCommentService(createdComment);
// console.log("comments",result);
  
        if (result.message) {
          sendServerError(res, result.message)
      } else {
          sendCreated(res, 'comment created successfully');
      }
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };
 
  // update comment
  export const updateCommentControllers = async (req, res) => {
    try {
      const { Content } = req.body;
      const { CommentID } = req.params;

      const CommentDate = new Date();    
      const { error } = updateCommentValidator({Content });
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const updatedComment = await updateCommentService({ Content,CommentDate, CommentID });
      console.log('Updated one',updatedComment);
      if (updatedComment.error) {
        return sendServerError(res, updatedComment.error);
      }
  
      return sendCreated(res, 'Comment updated successfully');
    } catch (error) {
      return sendServerError(res, 'Internal server error');
    }
  };

  export const updateContentControllers = async (req, res) => {
    try {
      const { Content } = req.body;
      const { CommentID } = req.params;

      const { error } = updateContentValidator({ Content});
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const updatedContent = await updateContentService({ Content, CommentID });
      console.log('Updated one',updatedContent);
  
      if (updatedContent.error) {
        return sendServerError(res, updatedContent.error);
      }
  
      return sendCreated(res, 'comment updated successfully');
    } catch (error) {
      return sendServerError(res, 'Internal server error');
    }
  };
  
  //Fetch a single comment
  export const getSingleCommentController=async(req,res)=>{
    try {
      const {CommentID}=req.params
      const singleComment=await getSingleCommentServices(CommentID)
      
      console.log('single',singleComment); 
      res.status(200).json({ comment: singleComment });

    } catch (error) {
      return error
    }
  }

  // get post comment
  export const getPostCommentController = async(req, res) => {
    try {
      const {PostID} = req.params
      const postComment = await getPostCommentServices(PostID)

      console.log('postComment', postComment);
      res.status(200).json( postComment );

    } catch (error) {
      return error
    }
  }

  //Get all commnents
  export const getAllCommentsController = async (req, res) => {
    try {
      const data = await getAllCommentsService()
      if (!data.recordset) {
        return sendNotFound(res, "No comments found")
      }
      res.status(200).json(data.recordset);
      // console.log("This is comments in the controller:", data);
    } catch (error) {
      sendServerError(res, error.message)
    }
  };
  
  export const deleteCommentController=async(req,res)=>{
    try {
      const {CommentID}=req.params
      const deletedComment=await deleteCommentServices(CommentID)
      console.log('deleted comment',deletedComment); 
      sendDeleteSuccess(res,"Deleted successfully")
    } catch (error) {
      return error
    }
  }