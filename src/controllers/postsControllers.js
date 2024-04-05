import { v4 } from "uuid";
import {addPostService, getAllPostsService, getOnePostService, getOnePhotoPostService, getOneVideoPostService, getOnePostByUIDService, updatePostService, deletePostService } from "../services/postServices.js";
import { postValidator } from "../validators/postValidator.js";
import { sendServerError, sendCreated, sendNotFound, sendDeleteSuccess } from "../helpers/helperFunctions.js";

//Create a new post
export const addPost = async (req, res) => {
  const { UserID, content, imageUrl, videoUrl, post_date } = req.body;
  const { error } = postValidator({ UserID, content, post_date });
  if (error) {
    return sendServerError(res, error.message);
  } else {
    try {
      const post_id = v4();
      const post_date = new Date();
      const newPost = { post_id, UserID, content, imageUrl, videoUrl, post_date };
      const response = await addPostService(newPost);
      if (response.message) {
        sendServerError(res, response.message);
      } else {
        sendCreated(res, "Post created successfully");
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  }
};

////////////////////////////////////////////////
// Fetch all posts
export const getAllPosts = async (req, res) => {
  try {
    const data = await getAllPostsService();
    if (!data.recordset) {
      return sendNotFound(res, "No posts found");
    }
    return res.status(200).json(data.recordset);
  } catch (error) {
    sendServerError(res, error);
  }
};

// Fetch one post by post ID
export const getOnePost = async (req, res) => {
  try {
    const { post_id } = req.params;
    const data = await getOnePostService(post_id);
    if (data.length !== 0) {
      return res.status(200).json(data[0]);
    } else {
      sendNotFound(res, "Poster not found");
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

//Fetch a one photo post
export const getOnePhotoPost = async (req, res) => {
  try {
    const { post_id } = req.params;
    const data = await getOnePhotoPostService(post_id);
    if (data.length !== 0) {
      return res.status(200).json(data[0]);
    } else {
      sendNotFound(res, "Poster not found");
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

//Fetch a one video post
export const getOneVideoPost = async (req, res) => {
  try {
    const { post_id } = req.params;
    const data = await getOneVideoPostService(post_id);
    if (data.length !== 0) {
      return res.status(200).json(data[0]);
    } else {
      sendNotFound(res, "Poster not found");
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

//getOnePostByUID
export const getOnePostByUID = async (req, res) => {
  try {
    const { UserID } = req.params;
    const data = await getOnePostByUIDService(UserID);
    if (data.length !== 0) {
      return res.status(200).json(data[0]);
    } else {
      sendNotFound(res, "Post by this user not found");
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

// Update post
export const updatePost = async (req, res) => {
  try {
    const { post_id } = req.params;
    const { UserID, content, post_date, likes, comments } = req.body;
    const { error } = postValidator({ UserID, content, post_date, likes, comments });
    if (error) {
      return sendServerError(res, error.message);
    }

    const response = await updatePostService(post_id, { UserID, content, post_date, likes, comments });
    // console.log(response);
    if (response.rowsAffected == 1) {
      return res.status(201).json({
        message: "Post updated successfully",
      });
    } else {
      sendNotFound(res, "Post not found or not updated");
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const { post_id } = req.params;
    const response = await deletePostService(post_id);
    if (response.rowsAffected == 1) {
      sendDeleteSuccess(res, "Post deleted successfully");
    }
  } catch (error) {
    sendServerError(res, error);
  }
};
