import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import logger from "../utils/Logger.js";
import { poolRequest, sql } from "../utils/dbConnect.js";

export const registerUserService = async (newUser) => {
  try {
    const newRegisteredUser = await poolRequest()
      .input("UserID", sql.VarChar, newUser.UserID)
      .input("Username", sql.VarChar, newUser.Username)
      .input("Email", sql.VarChar, newUser.Email)
      .input("Password", sql.VarChar, newUser.Password)
      .input("TagName", sql.VarChar, newUser.TagName)
      .input("Location", sql.VarChar, newUser.Location)
      .query(
        "INSERT INTO tbl_user(UserID,Username,Email,Password,TagName,Location) VALUES(@UserID,@Username,@Email,@Password,@TagName,@Location)"
      );
    logger.info("new user service", newRegisteredUser);
    return newRegisteredUser;
  } catch (error) {
    logger.error("Error while registering", error);
    return { error: "Invalid Credentials" };
  }
};

export const authenticateloginUserService = async (user) => {
  try {
    const userFoundResponse = await poolRequest()
      .input("Email", sql.VarChar, user.Email)
      .query("SELECT * FROM tbl_user WHERE Email=@Email");
    if (userFoundResponse.recordset[0]) {
    
      if(await bcrypt.compare(user.Password,userFoundResponse.recordset[0].Password)){

        let token=jwt.sign({
          UserID:userFoundResponse.recordset[0].UserID,
          Password:userFoundResponse.recordset[0].Password,
          Email:userFoundResponse.recordset[0].Email
        },process.env.SECRET_KEY,{ expiresIn: "24h" })
        console.log("Token is",token);
        const {Password,...user}=userFoundResponse.recordset[0]
        return {user,token:`JWT ${token}`}
  
      }else{
        return { error: 'Invalid Credentials' };
      }
    } else {
      return { error: "Invalid Credentials" };
    }
  } catch (error) {
    logger.error("Login Error", error);
    return { error: "Invalid Credentials" };
  }
};


export const updateUserService = async (updateUser) => {
  console.log("upadte user",updateUser);
  try {
    const updatedUser=await poolRequest()
    .input('Username', sql.VarChar,updateUser.Username)
    .input('UserID', sql.VarChar,updateUser.UserID)
    .input('TagName', sql.VarChar,updateUser.TagName)
    .input('Location', sql.VarChar,updateUser.Location)
    .input('company_name', sql.VarChar,updateUser.company_name)
    .input('website_link', sql.VarChar,updateUser.website_link)
    .input('profileImage', sql.VarChar,updateUser.profileImage)
  .query(`UPDATE tbl_user  SET Username = @Username, TagName = @TagName,Location = @Location , company_name=@company_name,website_link=@website_link , profileImage=@profileImage WHERE  userID = @userID`)
console.log("updated",updateUser);
  return updatedUser
  
  } catch (error) {
    return error
  }
};

export const updatePasswordService = async (updatePassword) => {
  try {
    const updatedPassword = await poolRequest()
      .input("UserID", sql.VarChar, updatePassword.UserID)
      .input("Password", sql.VarChar, updatePassword.Password)
      .query("UPDATE tbl_user SET Password=@Password WHERE UserID=@UserID");
    logger.info("updated password", updatedPassword);
    return updatedPassword;
  } catch (error) {
    return { error: "Invalid Credentials" };
  }
};

export const updateIsFriendService = async (updateIsFriend) => {
  try {
    const updatedIsFriend = await poolRequest()
      .input("UserID", sql.VarChar, updateIsFriend.UserID)
      .input("isFriend", sql.Bit, updateIsFriend.isFriend)
      .query("UPDATE tbl_user SET isFriend=1 WHERE UserID=@UserID");
    logger.info("updated isfriend", updatedPassword);
    return updatedIsFriend;
  } catch (error) {
    return { error: "Invalid Credentials" };
  }
};

export const getUserByEmailService = async (Email) => {
  try {
    const getUserByEmail = await poolRequest()
      .input("Email", sql.VarChar, Email)
      .query("SELECT * FROM tbl_user WHERE Email=@email");
    console.log("single user", getUserByEmail.recordset);
    if (getUserByEmail.rowsAffected[0] >= 0) {
      return getUserByEmail.rowsAffected[0];
    }
  } catch (error) {
    return error
  }
};

export const getSingleUserServices=async(UserID)=>{
  const singleUser= await poolRequest()
  .input('UserID', sql.VarChar,UserID)
  .query('SELECT * FROM tbl_user WHERE UserID = @UserID ')
  console.log('single user',singleUser);
  return singleUser
}


export const getAllUsersService = async () => {
  try {
    const allUsers = await poolRequest().query(`SELECT * FROM tbl_user`);
    // const { Password, ...users } = allUsers.recordset;
    // console.log("users", users);
    return allUsers;
  } catch (error) {
    return { error: "Invalid Credentials" };
  }
};

export const getAllNonFriendUsersService = async (user) => {
  try {
    const allNonFriendUsers = await poolRequest().query(`
      SELECT * FROM tbl_user WHERE isFriend = 0
    `);

    return allNonFriendUsers;
  } catch (error) {
    console.error('Error fetching non-friend users:', error.message);
    return { error: 'Error fetching non-friend users' };
  }
};


// Fetching delete user
export const deleteUserServices=async(UserID)=>{
  const deletedUser= await poolRequest()
  .input('UserID', sql.VarChar,UserID)
  .query('DELETE FROM tbl_user WHERE UserID = @UserID ')
  console.log(' yeah',deletedUser.recordset);
  return deletedUser.recordset;
}