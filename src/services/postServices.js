import { poolRequest, sql } from "../utils/dbConnect.js";
import { sendServerError, sendNotFound, sendDeleteSuccess} from "../helpers/helperFunctions.js";

// Add a new post
export const addPostService = async (newPost) => {
  try {

    //Check if post id already exists in the database
    const checkPostQuery = `
    SELECT COUNT(*) AS count
    FROM post
    WHERE post_id = @post_id`;

    const checkPostResult = await poolRequest()
    .input("post_id", sql.VarChar, newPost.post_id)
    .query(checkPostQuery);

    if (checkPostResult.recordset[0].count > 0) {
      throw new Error('The post seem duplicate, try something differenty')
    }

    // If the post_id is UniqueIdentifier, the post will be added
    const addPostQuery = `
    INSERT INTO post (post_id, UserID, content, imageUrl, videoUrl, post_date)
    VALUES (@post_id, @UserID, @content, @imageUrl, @videoUrl, @post_date)
    `;
    const result = await poolRequest()
      .input("post_id", sql.VarChar, newPost.post_id)
      .input("UserID", sql.VarChar, newPost.UserID)
      .input("content", sql.VarChar, newPost.content)
      .input("imageUrl", sql.VarChar, newPost.imageUrl)
      .input("videoUrl", sql.VarChar, newPost.videoUrl)
      .input("post_date", sql.DateTime, newPost.post_date)
      .query(addPostQuery);

    return result;
  } catch (error) {
    return error;
  }
};

////////////////////////////////////////////////////
// Fetch all posts
export const getAllPostsService = async () => {
  try {
    const result = await poolRequest().query(`SELECT * FROM post`);
    // console.log(result);
    return result;
  } catch (error) {
    return error;
  }
};

// Fetch one post
export const getOnePostService = async (post_id) => {
  try {
    const result = await poolRequest()
      .input("post_id", sql.VarChar(300), post_id)
      .query(`SELECT * FROM post WHERE post_id=@post_id`);
    return result.recordset;
  } catch (error) {
    return error;
  }
};

//Fetch a one photo post
export const getOnePhotoPostService = async (post_id) => {
  try {
    const result = await poolRequest()
      .input("post_id", sql.VarChar(300), post_id)
      .query(`SELECT post_id, UserID, content, imageUrl, post_date FROM post WHERE post_id=@post_id`);
    return result.recordset;
  } catch (error) {
    return error;
  }
};

//Fetch a one video post
export const getOneVideoPostService = async (post_id) => {
  try {
    const result = await poolRequest()
      .input("post_id", sql.VarChar(300), post_id)
      .query(`SELECT post_id, UserID, content, videoUrl, post_date FROM post WHERE post_id=@post_id`);
    return result.recordset;
  } catch (error) {
    return error;
  }
};

//Fetch one post by uid
export const getOnePostByUIDService = async (UserID) => {
  try {
    const result = await poolRequest()
      .input("UserID", sql.VarChar(255), UserID)
      .query(`SELECT * FROM post WHERE UserID = @UserID`);
    return result.recordset;
  } catch (error) {
    return error;
  }
};

// Update post
export const updatePostService = async (post_id, postDetails) => {
  try {
    const response = await poolRequest()
      .input("post_id", sql.VarChar(300), post_id)
      .input("UserID", sql.VarChar(255), postDetails.UserID)
      .input("content", sql.VarChar(sql.MAX), postDetails.content)
      .input("post_date", sql.DateTime, postDetails.post_date)
      .input("likes", sql.Int, postDetails.likes)
      .input("comments", sql.Int, postDetails.comments)
      .query(
        `UPDATE post SET UserID=@UserID, content=@content, post_date=@post_date, likes=@likes, comments=@comments WHERE post_id=@post_id`
      );
    return response;
  } catch (error) {
    return error;
  }
};

// Delete post
export const deletePostService = async (post_id) => {
  try {
    const response = await poolRequest()
      .input("post_id", sql.VarChar(300), post_id)
      .query("DELETE FROM post WHERE post_id=@post_id");
    return response;
  } catch (error) {
    return error;
  }
};
