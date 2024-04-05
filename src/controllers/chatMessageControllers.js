import {v4} from 'uuid'
import { notAuthorized, sendCreated, sendDeleteSuccess, sendServerError} from "../helpers/helperFunctions.js"
import { createChatValidator } from '../validators/chatValidators.js';
import { createChatService, deleteChatServices, getAllChatsService, getChatBySenderReceiverService, getSingleChatServices, getUserChatServices, updateChatService } from '../services/chatMessageService.js';

export const createChatController = async (req, res) => {
    try {

      const {SenderID,ReceiverID } = req.body;
      // console.log(req.body);

// Check if the message already exists
const existingChate = await getChatBySenderReceiverService({ SenderID, ReceiverID });
console.log("Existing chate contoller",existingChate);
if (existingChate.rowsAffected > 0) {
  // If the chat already exists, return it instead of creating a new one
  return res.status(200).send(existingChate.recordset);
}else{
  const ChatID = v4();
  const { error } = createChatValidator({SenderID,ReceiverID });
  console.log("error",error);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    const ChatDate = new Date();    
    const createdChat = { ChatID,SenderID,ReceiverID,ChatDate};

    const result = await createChatService(createdChat);

    if (result.message) {
      sendServerError(res, result.message)
  } else {
      sendCreated(res, 'Chat created successfully');
  }
  }
}
    } catch (error) {
      sendServerError(res, error.message);
    }
  };


  export const updateChatControllers = async (req, res) => {
    try {
      const { ChatID } = req.params;

     
  
      const updatedChat = await updateChatService({ ChatDate, ChatID });
      console.log('Updated one',updatedChat);
      if (updatedChat.error) {
        return sendServerError(res, updatedChat.error);
      }
  
      return sendCreated(res, 'chatupdated successfully');
    } catch (error) {
      return sendServerError(res, 'Internal server error');
    }
  };
  

    

  export const getUserChatController=async(req,res)=>{
    try {
      const {UserID}=req.params
      const userChat=await getUserChatServices(UserID)
      console.log("userChat",userChat);
    
      res.status(200).json(userChat );

    } catch (error) {
      return error
    }
  }

// messages per chat
  // export const getMessageChatController=async(req,res)=>{
  //   try {
  //     const {ChatID}=req.params
  //     const userMessageChat=await getMessageByChatIDServices(ChatID)
  //     console.log("userChat",userMessageChat);
    
  //     res.status(200).json(userMessageChat);

  //   } catch (error) {
  //     return error
  //   }
  // }

  
  
  export const getSUsersChatController=async(req,res)=>{
    try {
      const {SenderID,ReceiverID} = req.params;
      const singleChat = await getChatBySenderReceiverService({ SenderID, ReceiverID });
     const result=singleChat.recordset     
      console.log('singleChat',result); 
      res.status(200).json(result );

    } catch (error) {
      return error
    }
  }




  export const getSingleChatController=async(req,res)=>{
    try {
      const {ChatID}=req.params
      const singleChat=await getSingleChatServices(ChatID)
      
      console.log('single',singleChat); 
      res.status(200).json( singleChat );

    } catch (error) {
      return error
    }
  }



  export const getAllChatsController = async (req, res) => {
    try {
      const results = await getAllChatsService()
        const chats=results.recordset
        console.log(chats);
      res.status(200).json(chats);
    } catch (error) {
      console.error("Error fetching all chats:", error);
      res.status(500).json("Internal server error");
    }
  };
  

  export const deleteChatController=async(req,res)=>{
    try {
      const {ChatID}=req.params
      const deletedChat=await deleteChatServices(ChatID)
      console.log('deleted chat',deletedChat); 
      sendDeleteSuccess(res,"Deleted successfully")
    } catch (error) {
      return error
    }
  }
