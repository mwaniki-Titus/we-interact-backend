import {
  getAllUsersService,
  registerUserService,
  getUserByEmailService,
  authenticateloginUserService,
  getSingleUserServices,
  updateUserService,
  updatePasswordService,
  deleteUserServices,
  updateIsFriendService,
  getAllNonFriendUsersService,
} from "../services/usersServices.js";
import {updateUserPasswordValidator, updateUserValidator, userLoginValidation, userRegistrationValidation }from "../validators/userValidator.js";
import { v4 } from "uuid";
import {sendServerError,sendCreated, notAuthorized} from '../helpers/helperFunctions.js'
import bcrypt from 'bcrypt'

export const getAllUsersController = async (req, res) => {
  try {
    const results = await getAllUsersService();
    const users = results.recordset;
    console.log("users", users);
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching all users:", error);
    return res.status(500).json("Internal server error");
  }
};


export const getAllNonFriendUsersController = async (req, res) => {
  try {
    const results = await getAllNonFriendUsersService();
    const nonFriendUsers = results.recordset;
    console.log("users", nonFriendUsers);
    return res.status(200).json(nonFriendUsers);
  } catch (error) {
    console.error("Error fetching all users:", error);
    return res.status(500).json("Internal server error");
  }
};

export const registerNewUserController = async (req, res) => {
  try {
    const { Username, Email, Password, TagName, Location } = req.body;
    console.log(req.body);

    const existingUser = await getUserByEmailService(Email);
    console.log("existing user",existingUser);

  if (existingUser) {
    
    return res.status(400).send({message:"User with the provided email or username already exists"});
  }else{
 
    
    const { error } = userRegistrationValidation({ Username, Email, Password, TagName, Location } );
    console.log("error",error);
    if (error) {
      return res.status(400).send(error.details[0].message);
    } else {
      const UserID = v4();
      const hashedPassword = await bcrypt.hash(Password, 8);  
      
      const registeredUser = { 
        UserID:UserID.toLowerCase(),
        Username: Username.toLowerCase(),
        Email: Email.toLowerCase(),
        Password: hashedPassword,
        TagName: TagName.toLowerCase(),
        Location: Location.toLowerCase() };
        console.log("created user",registeredUser);

      const result = await registerUserService(registeredUser);

      if (result.message) {
        sendServerError(res, result.message)
    } else {
        sendCreated(res, 'User created successfully');
    }
    }
  }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const loginUserController=async(req,res)=>{
  try {
    const { Email, Password } = req.body;
      const { error } = userLoginValidation({ Email, Password });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await authenticateloginUserService({ Email, Password });

    if (user.error) {
      console.log(user.error);
      return notAuthorized(res, user.error);
    }

    // Successful login
    res.status(200).json({ user,message:"Logged In successfully!" });
  } catch (error) {
    return sendServerError(res, "Internal server error");
  }
}


export const updateUserControllers = async (req, res) => {
  try {
    const { Username, TagName, Location ,company_name,website_link , profileImage} = req.body;

    const { UserID } = req.params;
    console.log("user id",UserID);
    const existingUser = await getSingleUserServices(UserID);

    if (existingUser.rowsAffected[0] === 0) {
      return res.status(400).json({ message: "User not found" });
    }else{

    const { error } = updateUserValidator({ Username, TagName, Location ,company_name,website_link , profileImage});
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
// const lowerCaseUpdatedUser={
//   Username: Username.toLowerCase(),
//   TagName: TagName.toLowerCase(),
//   Location: Location.toLowerCase(),
//   company_name,
//   website_link,
//   profileImage
// }

// console.log("lowerCaseUpdatedUser",lowerCaseUpdatedUser);
    const updatedUser = await updateUserService({ Username, TagName, Location ,company_name,website_link , profileImage,UserID});
    console.log('Updated one', updatedUser);

    if (updatedUser.error || updatedUser.rowsAffected<1) {
      return sendServerError(res, updatedUser.error);
    }
    return sendCreated(res, 'User updated successfully');
  }
  } catch (error) {
    return sendServerError(res, 'Internal server error');
  }
};


export const updateUserPasswordControllers = async (req, res) => {
  try {
    const { Password } = req.body;
    const { UserID } = req.params;

    const { error } = updateUserPasswordValidator({ Password});
    const updatedhashedPassword=bcrypt.hash(Password,8)
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedPass = await updatePasswordService({ updatedhashedPassword, UserID });
console.log('Updated one',updatedPass);

    if (updatedPass.error) {
      return sendServerError(res, updatedPass.error);
    }

    return sendCreated(res, 'User updated successfully');
  } catch (error) {
    return sendServerError(res, 'Internal server error');
  }
};




export const getSingleUserController=async(req,res)=>{
  try {
    const {UserID}=req.params
    const singleUser=await getSingleUserServices(UserID)
    if(singleUser.rowsAffected==0){
      res.status(400).json({message:"user Not found"})
  }else{
    const {Password,...result}=singleUser.recordset[0]
    // const result=singleUser
    return res.status(200).json({ user: result });
  } 
    
  } catch (error) {
    return error
  }
}



export const deleteUserController=async(req,res)=>{
  try {
    const {UserID}=req.params
    const existingUser=await getSingleUserServices(UserID)
    if(existingUser.rowsAffected>0){
      const deletedUser=await deleteUserServices(UserID)
      console.log("deleted user",deletedUser);
      sendDeleteSuccess(res,"Deleted successfull")
  }else{
    res.status(400).json({message:"user Not found"})
  } 
    
  } catch (error) {
    return error
  }
}
