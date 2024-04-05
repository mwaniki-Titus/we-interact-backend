
import dotenv from 'dotenv'

import {poolRequest,sql} from '../utils/dbConnect.js'

dotenv.config();

// Register post service
export const createMessageService=async(message)=>{
  
  try {
    const result=await poolRequest()
    .input('MessageID', sql.VarChar,message.MessageID  )
    .input('SenderID', sql.VarChar,message.SenderID )
    .input('ChatID', sql.VarChar,message.ChatID )
    .input('Content', sql.VarChar,message.Content)
    .input('MessageDate', sql.DateTime,message.MessageDate)
    .query('INSERT INTO Message (MessageID,SenderID,ChatID,Content,MessageDate) VALUES(@MessageID,@SenderID,@ChatID,@Content,@MessageDate)')
    console.log('results',result);
    return result;

  } catch (error) {
    return error
  }
};
     

// updating post details based on the id

export const updateMessageService=async(updateMessage)=>{
  try {
    const updatedMessage=await poolRequest()
    .input('MessageID', sql.VarChar,updateMessage.MessageID  )
    .input('Content', sql.VarChar,updateMessage.Content)
    .input('MessageDate', sql.DateTime,updateMessage.MessageDate)
  .query(`UPDATE Message  SET MessageID=@MessageID, Content = @Content, MessageDate = @MessageDate  WHERE  MessageID = @MessageID`)
console.log(updateMessage);
  return updatedMessage
  
  } catch (error) {
    return error
  }
}

export const getMessageBySenderChatService=async (message)=>{
  const existMessages=await poolRequest()
  .input('SenderID', sql.VarChar,message.SenderID )
  .input('ChatID', sql.VarChar,message.ChatID )
  .query(`SELECT *
  FROM Message
  WHERE (SenderID = @SenderID AND ChatID = @ChatID)
     OR (SenderID = @ChatID AND ChatID = @SenderID)
  ORDER BY MessageDate DESC`)
  // console.log(existMessages,"existing");
  return existMessages
  
}

// updating the content
export const updateContentService=async(updateContent)=>{
  try {
    const updatedContent=await poolRequest()
    .input('Content', sql.VarChar,updateContent.Content)
    .input('MessageID', sql.VarChar,updateContent.MessageID)
    .query(`UPDATE Message  SET Content = @Content  WHERE  MessageID = @MessageID`)
    console.log("updating content",updateContent);
  return updatedContent
  
  } catch (error) {
    return error
  }
}

// getting a user message
export const getUserMessageServices = async (chat) => {
  try {
    const singleUserMessage = await poolRequest()
      .input('SenderID', sql.VarChar, chat.UserID)
      .input('ChatID', sql.VarChar, chat.ChatID)
      .query('SELECT * FROM Message WHERE SenderID = @SenderID OR ChatID=@ChatID');

    console.log('single message', singleUserMessage.recordset);
    return singleUserMessage.recordset;
  } catch (error) {
    console.error('Error retrieving user messages:', error.message);
    throw error; // Re-throw the error for higher-level error handling
  }
};



// getting a single message
export const getSingleMessageServices=async(MessageID)=>{
  const singleMessage= await poolRequest()
  .input('MessageID', sql.VarChar,MessageID)
  .query('SELECT * FROM Message WHERE MessageID = @MessageID ')
  console.log('single post',singleMessage.recordset);
  return singleMessage.recordset;
}

// getting a single message

export const getMessageByChatIDServices=async(ChatID)=>{
  const singleMessage= await poolRequest()
  .input('ChatID', sql.VarChar,ChatID)
  .query('SELECT * FROM Message WHERE ChatID = @ChatID ')
  console.log('single chat',singleMessage.recordset);
  return singleMessage.recordset;
}


// Fetching all available messages in the database
export const getAllMessagesService=async()=>{
    try {
        const allMessages=await poolRequest().query(`SELECT * FROM Message`)
        return allMessages
    } catch (error) {
        return error
    }
}

// Fetching delete message
export const deleteMessageServices=async(MessageID)=>{
  const deletedMessage= await poolRequest()
  .input('MessageID', sql.VarChar,MessageID)
  .query('DELETE FROM Message WHERE MessageID = @MessageID ')
  console.log('single message',deletedMessage.recordset);
  return deletedMessage.recordset;
}