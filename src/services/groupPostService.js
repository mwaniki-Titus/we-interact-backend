
import dotenv from 'dotenv'

import {poolRequest,sql} from '../utils/dbConnect.js'

dotenv.config();

// creating group service
export const createGroupActivityService=async(group)=>{
  
  try {
    const result=await poolRequest()
    .input('GroupActivityID', sql.VarChar,group.GroupActivityID )
    .input('GroupID', sql.VarChar,group.GroupID )
    .input('UploadedByID', sql.VarChar,group.UploadedByID )
    .input('description', sql.VarChar,group.description)
    .input('activity_photo', sql.VarChar,group.activity_photo)
    .input('CreatedDate', sql.DateTime,group.CreatedDate)
    .query('INSERT INTO GroupActivity (GroupActivityID,GroupID,UploadedByID,description,activity_photo,CreatedDate) VALUES(@GroupActivityID,@GroupID,@UploadedByID,@description,@activity_photo,@CreatedDate)')
    console.log('results',result);
    return result;

  } catch (error) {
    return error
  }
};

// GroupActivityID
// GroupID 
// description 
// activity_photo
// UploadedByID 
// CreatedDate

// updating group details based on the id

export const updateGroupService=async(updateGroup)=>{
  try {
    const updatedGroup=await poolRequest()
    .input('GroupID', sql.VarChar,updateGroup.GroupID )
    .input('GroupName', sql.VarChar,updateGroup.GroupName)
    .input('Description', sql.VarChar,updateGroup.Description)
    .input('group_image', sql.VarChar,updateGroup.group_image)
    .input('CreatedDate', sql.DateTime,updateGroup.CreatedDate)
    .query(`UPDATE tbl_group SET GroupID=@GroupID, GroupName = @GroupName,Description=@Description,group_image=@group_image, CreatedDate = @CreatedDate  WHERE  GroupID=@GroupID`)
    console.log(updatedGroup);
    return updatedGroup
    
  } catch (error) {
    return error
  }
}


// updating the group name
export const updateGroupNameService=async(updateGroupName)=>{
  try {
    const updatedGroupName=await poolRequest()
    .input('GroupID', sql.VarChar,updateGroupName.GroupID )
    .input('GroupName', sql.VarChar,updateGroupName.GroupName)
    .query(`UPDATE tbl_group SET GroupName = @GroupName  WHERE  GroupID = @GroupID`)
    console.log("updating GroupName",updatedGroupName);
  return updatedGroupName
  
  } catch (error) {
    return error
  }
}

// get single group services
export const getGroupActivityServices=async(GroupID)=>{
  const singleGroup= await poolRequest()
  .input('GroupID', sql.VarChar,GroupID)
  .query(`SELECT GroupActivity.*, tbl_user.*
  FROM GroupActivity
  INNER JOIN tbl_user ON GroupActivity.UploadedByID = tbl_user.UserID
  WHERE GroupID = @GroupID` )
  console.log('single group',singleGroup);
  return singleGroup;
}


// Fetching all available groups in the database
export const getAllGroupsActivityService=async()=>{
    try {
        const allGroupsActivity=await poolRequest().query(`SELECT GroupActivity.*, tbl_user.*
        FROM GroupActivity
        INNER JOIN tbl_group ON GroupActivity.GroupID = tbl_group.GroupID
        INNER JOIN tbl_user ON GroupActivity.UploadedByID = tbl_user.UserID`)
        return allGroupsActivity
    } catch (error) {
        return error
    }
}

// Fetching delete post
export const deleteGroupServices=async(GroupID)=>{
  const deletedGroup= await poolRequest()
  .input('GroupID', sql.VarChar,GroupID)
  .query('DELETE FROM tbl_group WHERE GroupID = @GroupID ')
  console.log('single group',deletedGroup.recordset);
  return deletedGroup.recordset;
}