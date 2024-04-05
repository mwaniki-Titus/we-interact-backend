
import dotenv from 'dotenv'

import {poolRequest,sql} from '../utils/dbConnect.js'

dotenv.config();

// create a chat
export const createChatService=async(Chat)=>{
  
  try {
    const result=await poolRequest()
    .input('ChatID', sql.VarChar,Chat.ChatID  )
    .input('SenderID', sql.VarChar,Chat.SenderID )
    .input('ReceiverID', sql.VarChar,Chat.ReceiverID )
    .input('ChatDate', sql.DateTime,Chat.ChatDate)
    .query('INSERT INTO tbl_chat (ChatID,SenderID,ReceiverID,ChatDate) VALUES(@ChatID,@SenderID,@ReceiverID,@ChatDate)')
    console.log('results',result);
    return result;

  } catch (error) {
    return error
  }
};
     

// updating post details based on the id

export const updateChatService=async(updateChat)=>{
  try {
    const updatedChat=await poolRequest()
    .input('ChatID', sql.VarChar,updateChat.ChatID  )
    .input('ChatDate', sql.DateTime,updateChat.MessageDate)
  .query(`UPDATE tbl_chat  SET ChatID=@ChatID,ChatDate = @ChatDate  WHERE  ChatID = @ChatID`)
console.log(updateChat);
  return updatedChat
  
  } catch (error) {
    return error
  }
}

export const getChatBySenderReceiverService=async (chat)=>{
  const existChats=await poolRequest()
  .input('SenderID', sql.VarChar,chat.SenderID )
  .input('ReceiverID', sql.VarChar,chat.ReceiverID )
  .query(`SELECT *
  FROM tbl_chat
  WHERE (SenderID = @SenderID AND ReceiverID = @ReceiverID)
     OR (SenderID = @ReceiverID AND ReceiverID = @SenderID)
  ORDER BY ChatDate DESC`)
  // console.log(existMessages,"existing");
  return existChats
  
}



// getting a user message
export const getUserChatServices = async (UserID) => {
  try {
    const singleUserChat = await poolRequest()
      .input('SenderID', sql.VarChar, UserID)
      .input('ReceiverID', sql.VarChar, UserID)
      .query('SELECT * FROM tbl_chat WHERE SenderID = @SenderID OR ReceiverID=@ReceiverID ');

    console.log('single chat', singleUserChat.recordset);
    return singleUserChat.recordset;
  } catch (error) {
    console.error('Error retrieving user messages:', error.message);
    throw error; 
  }
};


// getting a single message
export const getSingleChatServices=async(ChatID)=>{
  const singleChat= await poolRequest()
  .input('ChatID', sql.VarChar,ChatID)
  .query('SELECT * FROM tbl_chat WHERE ChatID = @ChatID ')
  console.log('single post',singleChat.recordset);
  return singleChat.recordset;
}


// Fetching all available messages in the database
export const getAllChatsService=async()=>{
    try {
        const allChats=await poolRequest().query(`SELECT * FROM tbl_chat`)
        return allChats
    } catch (error) {
        return error
    }
}

// Fetching delete message
export const deleteChatServices=async(ChatID)=>{
  const deletedChat= await poolRequest()
  .input('ChatID', sql.VarChar,ChatID)
  .query('DELETE FROM tbl_chat WHERE ChatID = @ChatID ')
  console.log('single chat',deletedChat.recordset);
  return deletedChat.recordset;
}